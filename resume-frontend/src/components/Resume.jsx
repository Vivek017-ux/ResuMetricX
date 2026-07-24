import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const Resume = ({ data }) => {
  const resumeRef = useRef(null);

  console.log(data.personalInformation);
  console.log("LinkedIn =", JSON.stringify(data.personalInformation.linkedIn));

  const handleDownloadPdf = () => {
    toPng(resumeRef.current, { quality: 1.0, pixelRatio: 2 })
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

          // image ka mm me actual height (width ko 190mm fix rakhte hue)
          const imgWidthMm = usableWidth;
          const imgHeightMm = (img.height * imgWidthMm) / img.width;

          // agar ek page se zyada hai to slice karke multiple pages banao
          let heightLeft = imgHeightMm;
          let position = 0; // top offset within the full image (in mm)

          // canvas banake image ko slice karna hoga taaki har page pe sahi hissa aaye
          const pxPerMm = img.width / imgWidthMm; // scale factor
          const pageHeightPx = usableHeight * pxPerMm;

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
              0, renderedHeightPx, img.width, sliceHeightPx, // source crop
              0, 0, img.width, sliceHeightPx                  // destination
            );

            const sliceDataUrl = canvas.toDataURL("image/png");
            const sliceHeightMm = sliceHeightPx / pxPerMm;

            if (renderedHeightPx > 0) pdf.addPage();
            pdf.addImage(sliceDataUrl, "PNG", margin, margin, imgWidthMm, sliceHeightMm);

            renderedHeightPx += sliceHeightPx;
          }

          pdf.save(`${data.personalInformation.fullName}.pdf`);
        };
      })
      .catch((err) => {
        console.error("Error generating PDF", err);
      });
  };


  return (
    <>
      {/* <pre>
        {JSON.stringify(data.personalInformation, null, 2)}
      </pre> */}
      <div
        ref={resumeRef}
        className="max-w-4xl  mx-auto shadow-2xl rounded-lg p-8 space-y-6 bg-base-100 text-base-content border border-gray-200 dark:border-gray-700 transition-all duration-300"
      >
        {/* Header Section */}

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            {data.personalInformation.fullName}
          </h1>
          <p className="text-lg text-gray-800">
            {data.personalInformation.location}
          </p>

          <div className="flex justify-center items-center space-x-4 mt-2">
            {data.personalInformation.email && (
              <a
                href={`mailto:${data.personalInformation.email}`}
                className="flex items-center text-gray-800 hover:underline"
              >
                <FaEnvelope className="mr-2" /> {data.personalInformation.email}
              </a>
            )}
            {data.personalInformation.email && data.personalInformation.phoneNumber && (
              <span className="text-gray-400">|</span>
            )}
            {data.personalInformation.phoneNumber && (
              <p className="flex items-center text-gray-800">
                <FaPhone className="mr-2" />{" "}
                {data.personalInformation.phoneNumber}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center space-x-4 mt-2">
            {data.personalInformation.gitHub && (
              <a
                href={data.personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-gray-700 flex items-center"
              >
                <FaGithub className="mr-2" /> GitHub
              </a>
            )}
            {data.personalInformation.gitHub && data.personalInformation.linkedIn && (
              <span className="text-gray-400">|</span>
            )}

            {data.personalInformation.linkedIn?.trim() && (
              <a
                href={data.personalInformation.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-blue-700 flex items-center"
              >
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
            )}

          </div>
        </div >

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Summary Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Summary</h2>
          <p className="text-gray-600 dark:text-gray-900">{data.summary}</p>
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>


        {/* Education Section */}
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



        {/* Skills Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {data.skills.map((skill, index) => (
              <div
                key={index}
                className="badge badge-outline badge-lg px-4 py-2"
              >
                <span className="text-gray-900 font-semibold">{skill.title}</span> -{" "}
                <span className="ml-1 text-gray-1000">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Experience Section */}
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







        {/* Certifications Section */}
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



        {/* Projects Section */}

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          {data.projects.map((proj, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-gray-900">{proj.title}</h3>
              <p className="text-gray-900">{proj.description}</p>
              <p className="text-gray-800 text-sm">
                🛠 Technologies: {proj.technologiesUsed.join(", ")}
              </p>
              {proj.githubLink && (

                <a
                  href={proj.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:underline"
                >
                  🔗 GitHub Link
                </a>
              )}
            </div>
          ))}
        </section >



        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>



        {/* Achievements Section */}
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



        {/* Languages Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Languages</h2>
          <ul className="list-disc pl-6 text-gray-900 dark:text-gray-900">
            {data.languages.map((lang, index) => (
              <li key={index}>{lang.name}</li>
            ))}
          </ul>
        </section>

        <div className="divider before:bg-gray-200 after:bg-gray-200 before:h-[2px] after:h-[2px]"></div>

        {/* Interests Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900">Interests</h2>
          <ul className="list-disc pl-6 text-gray-900 dark:text-gray-900">
            {data.interests.map((interest, index) => (
              <li key={index}>{interest.name}</li>
            ))}
          </ul>
        </section>
      </div >

      <section className="flex justify-center mt-4 ">
        <div onClick={handleDownloadPdf} className="btn btn-primary">
          Print
        </div>
      </section>
    </>
  );
};

export default Resume;