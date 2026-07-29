

import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef } from "react";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  const normalizeUrl = (url) => {
    if (!url?.trim()) return null;
    const trimmed = url.trim();
    return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  };

  const handleDownloadPdf = () => {
    const original = resumeRef.current;
    if (!original) return;

    // --- STEP 1: capture link positions from the REAL (visible) DOM ---
    // We must measure the actual rendered <a> tags before we screenshot,
    // because a PNG has no concept of links - only pixels.
    const linkEls = Array.from(original.querySelectorAll("a[href]"));
    const containerRect = original.getBoundingClientRect();
    const linkData = linkEls.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        href: el.getAttribute("href"),
        x: rect.left - containerRect.left,
        y: rect.top - containerRect.top,
        width: rect.width,
        height: rect.height,
      };
    });

    // --- STEP 2: clone + hide for screenshotting (unchanged from before) ---
    const clone = original.cloneNode(true);
    const hiddenContainer = document.createElement("div");
    hiddenContainer.style.position = "fixed";
    hiddenContainer.style.top = "0";
    hiddenContainer.style.left = "-99999px";
    hiddenContainer.style.zIndex = "-1";
    hiddenContainer.appendChild(clone);
    document.body.appendChild(hiddenContainer);

    toPng(clone, { quality: 1.0, pixelRatio: 2 })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF("p", "mm", "a4");

          const pageWidth = 210;
          const pageHeight = 297;
          const margin = 10;
          const usableWidth = pageWidth - margin * 2;
          const usableHeight = pageHeight - margin * 2;

          const imgWidthMm = usableWidth;
          const imgHeightMm = (img.height * imgWidthMm) / img.width;

          const pxPerMm = img.width / imgWidthMm;
          const pageHeightPx = usableHeight * pxPerMm;

          // --- STEP 3: scale factor between live DOM px and screenshot px ---
          // toPng was called with pixelRatio: 2, so the screenshot is 2x the
          // CSS pixel size that getBoundingClientRect() reports.
          const cssToImgScale = img.width / containerRect.width;

          let renderedHeightPx = 0;
          const canvas = document.createElement("canvas");
          canvas.width = img.width;

          while (renderedHeightPx < img.height) {
            const sliceHeightPx = Math.min(pageHeightPx, img.height - renderedHeightPx);
            canvas.height = sliceHeightPx;

            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
              img,
              0, renderedHeightPx, img.width, sliceHeightPx,
              0, 0, img.width, sliceHeightPx
            );

            const sliceDataUrl = canvas.toDataURL("image/png");
            const sliceHeightMm = sliceHeightPx / pxPerMm;

            if (renderedHeightPx > 0) pdf.addPage();
            pdf.addImage(sliceDataUrl, "PNG", margin, margin, imgWidthMm, sliceHeightMm);

            // --- STEP 4: add real clickable link annotations on this page ---
            linkData.forEach((link) => {
              const linkTopImgPx = link.y * cssToImgScale;
              const linkBottomImgPx = (link.y + link.height) * cssToImgScale;

              const isOnThisSlice =
                linkBottomImgPx > renderedHeightPx &&
                linkTopImgPx < renderedHeightPx + sliceHeightPx;

              if (isOnThisSlice) {
                const relTopPx = linkTopImgPx - renderedHeightPx;
                const linkXmm = margin + (link.x * cssToImgScale) / pxPerMm;
                const linkYmm = margin + relTopPx / pxPerMm;
                const linkWmm = (link.width * cssToImgScale) / pxPerMm;
                const linkHmm = (link.height * cssToImgScale) / pxPerMm;

                pdf.link(linkXmm, linkYmm, linkWmm, linkHmm, { url: link.href });
              }
            });

            renderedHeightPx += sliceHeightPx;
          }

          pdf.save(`${data.personalInformation.fullName}.pdf`);
          document.body.removeChild(hiddenContainer);
        };
        img.onerror = () => {
          document.body.removeChild(hiddenContainer);
        };
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
        document.body.removeChild(hiddenContainer);
      });
  };

  const githubUrl = normalizeUrl(data.personalInformation.gitHub);
  const linkedInUrl = normalizeUrl(data.personalInformation.linkedIn);

  return (
    <>
      <div
        ref={resumeRef}
        className="max-w-4xl mx-auto shadow-2xl rounded-lg p-8 space-y-6 bg-base-100 text-base-content border border-gray-200 dark:border-gray-700 transition-all duration-300"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            {data.personalInformation.fullName}
          </h1>
          <p className="text-lg text-gray-800">
            {data.personalInformation.location}
          </p>

          {/* Email / Phone */}
          <div className="flex justify-center items-center space-x-4 mt-2 relative z-10">
            {data.personalInformation.email && (
              <a
                href={`mailto:${data.personalInformation.email}`}
                className="flex items-center text-gray-800 hover:underline hover:text-blue-700 cursor-pointer relative z-10"
                style={{ pointerEvents: "auto" }}
              >
                <FaEnvelope className="mr-2" /> {data.personalInformation.email}
              </a>
            )}

            {data.personalInformation.email && data.personalInformation.phoneNumber && (
              <span className="text-gray-400">|</span>
            )}
            {data.personalInformation.phoneNumber && (
              <p className="flex items-center text-gray-800">
                <FaPhone className="mr-2" /> {data.personalInformation.phoneNumber}
              </p>
            )}
          </div>

          {/* GitHub / LinkedIn */}
          <div className="flex justify-center items-center space-x-4 mt-2 relative z-10">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-700 hover:underline flex items-center cursor-pointer relative z-10"
                style={{ pointerEvents: "auto" }}
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
            {githubUrl && linkedInUrl && <span className="text-gray-400">|</span>}
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-700 hover:underline flex items-center cursor-pointer relative z-10"
                style={{ pointerEvents: "auto" }}
              >
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Summary */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Summary</h2>
          <p className="text-gray-600 dark:text-gray-900">{data.summary}</p>
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
              <p className="text-gray-900">
                {edu.university}, {edu.location}
              </p>
              <p className="text-gray-900 text-sm">
                🎓 Graduation Year: {edu.graduationYear}
              </p>
            </div>
          ))}
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="badge badge-outline badge-lg px-4 py-2">
                <span className="text-gray-900 font-semibold">{skill.title}</span> -{" "}
                <span className="ml-1 text-gray-1000">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{exp.jobTitle}</h3>
              <p className="text-gray-800">
                {exp.company} | {exp.location}
              </p>
              <p className="text-gray-900 text-sm">{exp.duration}</p>
              <p className="mt-1 text-gray-900">{exp.responsibility}</p>
            </div>
          ))}
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Certifications */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Certifications
          </h2>
          {data.certifications.map((cert, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{cert.title}</h3>
              <p className="text-gray-900">
                {cert.issuingOrganization} - {cert.year}
              </p>
            </div>
          ))}
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          {data.projects.map((proj, index) => {
            const projGithubUrl = normalizeUrl(proj.githubLink);
            return (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{proj.title}</h3>
                <p className="text-gray-900">{proj.description}</p>
                <p className="text-gray-800 text-sm">
                  🛠 Technologies: {proj.technologiesUsed.join(", ")}
                </p>
                {projGithubUrl && (
                  <a
                    href={projGithubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:underline cursor-pointer relative z-10 inline-block"
                    style={{ pointerEvents: "auto" }}
                  >
                    🔗 GitHub Link
                  </a>
                )}
              </div>
            );
          })}
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Achievements */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Achievements
          </h2>
          {data.achievements.map((ach, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{ach.title}</h3>
              <p className="text-gray-900 text-sm">{ach.year}</p>
              <p className="text-gray-900">{ach.extraInformation}</p>
            </div>
          ))}
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Languages */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Languages</h2>
          <ul className="list-disc pl-6 text-gray-900 dark:text-gray-900">
            {data.languages.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Interests */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Interests</h2>
          <ul className="list-disc pl-6 text-gray-900 dark:text-gray-900">
            {data.interests.map((interest, index) => (
              <li key={index}>{interest.name}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="flex justify-center mt-4">
        <button
          onClick={handleDownloadPdf}
          className="btn rounded-full px-8 border-none text-primary-content bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
        >
          Print
        </button>
      </section>
    </>
  );
};

export default Resume;


