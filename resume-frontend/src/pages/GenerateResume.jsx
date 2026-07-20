
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane } from "react-icons/fa";
import { generateResume } from "../api/ResumeService";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Resume from '../components/Resume';


import { useOutletContext } from "react-router";

const GenerateResume = () => {
  const { setShowNavbar } = useOutletContext();
  const [data, setData] = useState({
    personalInformation: {
      fullName: "",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
  });

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: data,
  });

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({
    control,
    name: "certifications",
  });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  //handle form submit
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setData({ ...data });

    setShowFormUI(false);
    setShowPromptInput(false);
    setShowResumeUI(true);

    setShowNavbar(false);
  };


  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    console.log(description);
    // server call to get resume

    try {
      setLoading(true);
      const responseData = await generateResume(description);
      console.log(responseData);
      reset(responseData.data);

      toast.success("Resume Generated Successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setShowFormUI(true);
      setShowPromptInput(false);
      setShowResumeUI(false);
    } catch (error) {
      console.log(error);
      toast.error("Error Generating Resume!");
    } finally {
      setLoading(false);
      setDescription("");
    }
  };

  const handleClear = () => {
    setDescription("");
  };

  // ---- Case-file stepper: reflects the real 3-stage sequence of this tool ----
  const currentStep = showPromptInput ? 1 : showFormUI ? 2 : 3;
  const steps = [
    { n: "01", label: "Describe" },
    { n: "02", label: "Refine" },
    { n: "03", label: "Review" },
  ];

  const renderStepper = () => (
    <div className="w-full max-w-2xl mx-auto mb-10 px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <React.Fragment key={step.n}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${currentStep >= i + 1
                  ? "bg-primary text-primary-content shadow-lg shadow-primary/40"
                  : "bg-base-100/50 backdrop-blur-md text-base-content/40 border border-base-content/10"
                  }`}
              >
                {step.n}
              </div>
              <span
                className={`font-mono text-[11px] uppercase tracking-widest ${currentStep >= i + 1
                  ? "text-base-content font-semibold"
                  : "text-base-content/40"
                  }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 mb-6 rounded-full transition-all duration-300 ${currentStep > i + 1
                  ? "bg-gradient-to-r from-primary to-secondary"
                  : "bg-base-content/10"
                  }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full mb-4">
      <label className="label pb-1">
        <span className="label-text font-mono text-[11px] uppercase tracking-widest text-base-content/50">
          {label}
        </span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="w-full bg-base-100/40 backdrop-blur-sm text-base-content border border-base-content/10 rounded-xl px-4 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200"
      />
    </div>
  );
  const renderFieldArray = (fields, label, name, keys) => {
    return (
      <div className="form-control w-full mb-8">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-base-content">
          <span className="w-2 h-6 rounded-full bg-gradient-to-b from-primary to-secondary"></span>
          {label}
        </h3>
        {fields.fields.map((field, index) => (
          <div
            key={field.id}
            className="relative p-5 mb-4 rounded-2xl bg-base-100/40 backdrop-blur-md border border-base-content/10 shadow-sm hover:border-primary/40 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            {keys.map((key) => (
              <div key={key}>
                {console.log(`${name}`)}
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="btn btn-error btn-sm btn-outline rounded-full mt-2"
            >
              <FaTrash className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            fields.append(
              keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
            )
          }
          className="btn btn-sm btn-outline btn-primary rounded-full self-start"
        >
          <FaPlusCircle className="w-3.5 h-3.5" /> Add {label}
        </button>
      </div>
    );
  };

  function showFormFunction() {
    return (
      <div className="w-full max-w-5xl px-4">
        {renderStepper()}
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] mb-2 text-primary font-semibold">
            Case File — Draft
          </p>
          <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            <BiBook className="text-primary" /> Resume Details
          </h1>
        </div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-8 md:p-12 rounded-3xl bg-base-100/40 backdrop-blur-xl border border-base-content/10 shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mb-8 pb-8 border-b border-base-content/10">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput(
                "personalInformation.phoneNumber",
                "Phone Number",
                "tel"
              )}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-base-content">
                <span className="w-2 h-6 rounded-full bg-gradient-to-b from-primary to-secondary"></span>
                Summary
              </h3>
              <textarea
                {...register("summary")}
                className="w-full bg-base-100/40 backdrop-blur-sm text-base-content border border-base-content/10 rounded-xl px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 resize-none"
                rows={4}
              ></textarea>
            </div>

            {renderFieldArray(skillsFields, "Skills", "skills", [
              "title",
              "level",
            ])}
            {renderFieldArray(experienceFields, "Experience", "experience", [
              "jobTitle",
              "company",
              "location",
              "duration",
              "responsibility",
            ])}
            {renderFieldArray(educationFields, "Education", "education", [
              "degree",
              "university",
              "location",
              "graduationYear",
            ])}
            {renderFieldArray(
              certificationsFields,
              "Certifications",
              "certifications",
              ["title", "issuingOrganization", "year"]
            )}
            {renderFieldArray(projectsFields, "Projects", "projects", [
              "title",
              "description",
              "technologiesUsed",
              "githubLink",
            ])}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-base-content/10">
              <div>
                {renderFieldArray(languagesFields, "Languages", "languages", [
                  "name",
                ])}
              </div>
              <div>
                {renderFieldArray(interestsFields, "Interests", "interests", [
                  "name",
                ])}
              </div>
            </div>

            <button
              type="submit"
              className="btn w-full py-4 mt-4 rounded-full font-semibold text-base border-none text-primary-content bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.01] transition-all duration-300"
            >
              Finalize Resume
            </button>
          </form>
        </div>
      </div>
    );
  }

  function ShowInputField() {
    return (
      <div className="w-full max-w-2xl px-4">
        {renderStepper()}
        <div className="relative rounded-3xl bg-base-100/40 backdrop-blur-xl border border-base-content/10 shadow-2xl p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-primary/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-secondary/30 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30">
                <FaBrain className="text-primary text-3xl" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Describe Yourself
            </h1>
            <p className="mb-6 text-base text-base-content/60">
              Write a few sentences about your background. The AI drafts the
              resume — you refine it next.
            </p>
            <textarea
              disabled={loading}
              className="w-full h-48 mb-6 resize-none bg-base-100/40 backdrop-blur-sm text-base-content border border-base-content/10 rounded-2xl p-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-200 placeholder:text-base-content/30"
              placeholder="e.g. I'm a backend engineer with 4 years of experience in Java and Spring Boot..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-center gap-4">
              <button
                disabled={loading}
                onClick={handleGenerate}
                className="btn rounded-full px-8 flex items-center gap-2 border-none text-primary-content bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
              >
                {loading && <span className="loading loading-spinner"></span>}
                <FaPaperPlane />
                Generate Resume
              </button>
              <button
                onClick={handleClear}
                className="btn btn-outline rounded-full px-8 flex items-center gap-2 border-base-content/20 text-base-content/70 hover:bg-error hover:text-error-content hover:border-error transition-all duration-300"
              >
                <FaTrash /> Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  function showResume() {
    return (
      <div className="w-full flex flex-col items-center px-4">
        {renderStepper()}
        <div className="w-full max-w-5xl rounded-3xl bg-base-200 p-6 md:p-10 shadow-xl">
          <Resume data={data} />
        </div>

        <div className="flex mt-8 justify-center gap-3">
          <button
           
            onClick={() => {
              setShowPromptInput(true);
              setShowFormUI(false);
              setShowResumeUI(false);

              setShowNavbar(true);
            }}

            className="btn btn-outline btn-accent rounded-full px-8"
          >
            New Case File
          </button>
          <button

            onClick={() => {
              setShowPromptInput(false);
              setShowFormUI(true);
              setShowResumeUI(false);

              setShowNavbar(true);
            }}
            className="btn rounded-full px-8 border-none text-primary-content bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300"
          >
            Edit Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-theme={showResumeUI ? "light" : undefined}
      className="min-h-screen py-14 flex flex-col items-center justify-center font-sans bg-base-200 relative overflow-hidden"
    >
      {/* Ambient glow only during Describe/Refine steps — Review step stays clean & fully light */}
      {!showResumeUI && (
        <>
          <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-secondary/20 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25rem] h-[25rem] bg-accent/10 rounded-full blur-[100px]"></div>
        </>
      )}

      <div className="relative w-full flex flex-col items-center">
        {showFormUI && showFormFunction()}
        {showPromptInput && ShowInputField()}
        {showResumeUI && showResume()}
      </div>
    </div>
  );
};

export default GenerateResume;