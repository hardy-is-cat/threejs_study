import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_z5k8591",
        "template_33acxvz",
        {
          from_name: formData.name,
          to_name: "정현",
          from_email: formData.email,
          to_email: "zualzual0119@gmail.com",
          message: formData.message,
        },
        "8dUTHt3L6-lP9-0o6"
      );
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });

      handleAlert("success", "전송이 성공했습니다!");
    } catch (error) {
      console.error(error);
      setIsLoading(false);

      handleAlert("danger", "전송이 실패했습니다!");
    }
  };

  return (
    <section
      id="contact"
      className="relative flex items-center c-space section-spacing"
    >
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#fff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 bg-primary rounded-2xl">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk!</h2>
          <p className="font-normal text-neutral-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
            ipsam porro dolores dolorum? Facere nemo, debitis sapiente.
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              성함
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="김 아무개"
              className="field-input field-input-focus"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="hardymom@gmail.com"
              className="field-input field-input-focus"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="name" className="field-label">
              메세지
            </label>
            <textarea
              type="text"
              name="message"
              id="message"
              rows="4"
              placeholder="메세지를 입력해주세요."
              className="field-input field-input-focus"
              autoComplete="message"
              required
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {isLoading ? "전송 중..." : "전송"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
