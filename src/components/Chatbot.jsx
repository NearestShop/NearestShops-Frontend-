import { useState, useEffect, useRef } from "react";
import { getData } from "../Services/apiCalls";
import axios from "axios";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Chatbot = () => {
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendation, setRecommendation] = useState("");
  const [loading2, setLoading2] = useState(true);
  const parentDev = useRef();

  useEffect(() => {
    document.title = `Nearest Shops | Chatbot`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getData("category");
      setCategories(response.data.categories.map((category) => category.slug));
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const sendMessage = () => {
    parentDev.current.scrollTop = parentDev.current.scrollHeight;
    if (message === "") {
      return toast.error("Please enter a message");
    }
    if (stage === 1) {
      if (message.toLowerCase().includes("male") || message.toLowerCase().includes("female") || message.toLowerCase().includes("both")) {
        setGender(message);
        setMessage("");
        setStage(2);
      } else {
        toast.error("Please enter a valid gender");
        setMessage("");
      }
    }
    if (stage === 2) {
      if (!isNaN(message)) {
        setHeight(message);
        setMessage("");
        setStage(3);
      } else {
        toast.error("Please enter a valid height");
        setMessage("");
      }
    }
    if (stage === 3) {
      if (!isNaN(message)) {
        setWeight(message);
        setMessage("");
        setStage(4);
      } else {
        toast.error("Please enter a valid weight");
        setMessage("");
      }
    }
    if (stage === 4) {
      if (categories.includes(message.toLowerCase())) {
        setCategory(message);
        setMessage("");
        setStage(5);
        fetchRecommendation(weight, height, gender, message.toLowerCase());
      } else {
        toast.error("Please enter a valid category");
        setMessage("");
      }
    }
  };

  const fetchRecommendation = async (w, h, g, c) => {
    const response = await axios.post("https://pynearshop.codepeak.live/recommend", { weight: w, height: h, gender: g, category: c });
    if (response.status === 200) {
      setRecommendation(response.data.products);
      setLoading2(false);
    }
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <section className="minHeight flex justify-center items-center px-4 py-12">
      <div className="">
        <h3 className="text-center font-semibold text-3xl mb-4">Chat Bot</h3>
        <p className="text-center font-semibold text-xl mb-8 capitalize">Talk to our new chatbot and get a recommendation !</p>
        <div className="bg-[#fafafa] min-h-[400px] border flex flex-col justify-between md:max-w-[560px]">
          <div ref={parentDev} className="messages flex flex-col overflow-y-scroll h-[360px]">
            <div className="p-2 flex items-center gap-2">
              <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="grow b-white h-[40px] flex items-center bg-white border px-2 rounded-xl">Hello There !</div>
            </div>
            <div className="p-2 flex items-center gap-2">
              <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="grow b-white h-[40px] flex items-center bg-white border px-2 rounded-xl">I am a chatbot here to help you !</div>
            </div>
            <div className="p-2 flex items-center gap-2">
              <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                <i className="fa-solid fa-headset"></i>
              </div>
              <div className="grow b-white h-[40px] flex items-center bg-white border px-2 rounded-xl">What type are you looking for (Male, Female, Both) ?</div>
            </div>
            {gender !== "" && (
              <div className="p-2 flex items-center gap-2">
                <div className="grow b-white h-[40px] flex items-center bg-white border px-2 rounded-xl">{gender}</div>
                <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                  <i className="fa-regular fa-user"></i>
                </div>
              </div>
            )}
            {stage >= 2 && (
              <div className="p-2 flex items-center gap-2">
                <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="grow b-white py-1 flex items-center bg-white border px-2 rounded-xl">What is your height (in CM) ?</div>
              </div>
            )}
            {height !== "" && (
              <div className="p-2 flex items-center gap-2">
                <div className="grow b-white py-1 flex items-center bg-white border px-2 rounded-xl">{height}</div>
                <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                  <i className="fa-regular fa-user"></i>
                </div>
              </div>
            )}
            {stage >= 3 && (
              <div className="p-2 flex items-center gap-2">
                <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="grow b-white py-1 flex items-center bg-white border px-2 rounded-xl">What is your weight (in KG) ?</div>
              </div>
            )}
            {weight !== "" && (
              <div className="p-2 flex items-center gap-2">
                <div className="grow b-white py-1 flex items-center bg-white border px-2 rounded-xl">{weight}</div>
                <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                  <i className="fa-regular fa-user"></i>
                </div>
              </div>
            )}
            {stage >= 4 && (
              <div className="p-2 flex items-center gap-2">
                <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                  <i className="fa-solid fa-headset"></i>
                </div>
                <div className="grow b-white py-1 flex flex-wrap items-center bg-white border px-2 rounded-xl">
                  What category are you interested in <span className="capitalize">({loading ? "Loading Category List" : categories.map((category) => category + " ")})</span> ?
                </div>
              </div>
            )}
            {category !== "" && (
              <div className="p-2 flex items-center gap-2">
                <div className="grow b-white py-1 flex items-center bg-white border px-2 rounded-xl">{category}</div>
                <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                  <i className="fa-regular fa-user"></i>
                </div>
              </div>
            )}
            {stage >= 5 && (
              <>
                <div className="p-2 flex items-center gap-2">
                  <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  <div className="grow b-white py-1 flex flex-wrap items-center bg-white border px-2 rounded-xl">{loading2 ? "Loading Recommendation" : "Here is a list of some recommended items!"}</div>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  <div className="grow b-white py-1 flex flex-wrap gap-2 items-center bg-white border px-2 rounded-xl">
                    {loading2
                      ? "Loading Recommendation"
                      : recommendation.map((recommendation, index) => (
                          <Link to={`/product/${recommendation.slug}`} className="text-accent" key={index}>
                            {recommendation.name}{" "}
                          </Link>
                        ))}
                  </div>
                </div>
                <div className="p-2 flex items-center gap-2">
                  <div className="text-xl bg-accent size-[40px] flex justify-center items-center text-white rounded-full">
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  <div className="grow b-white py-1 flex flex-wrap items-center bg-white border px-2 rounded-xl">{loading2 ? "Loading Recommendation" : "Thanks For Using Our Chatbot!"}</div>
                </div>
              </>
            )}
          </div>
          <div className="relative flex items-center border-t bg-white">
            <input onKeyDown={handleEnterPress} onChange={(e) => setMessage(e.target.value)} value={message} className="w-full outline-none p-2" type="text" />
            <div onClick={sendMessage} className="p-2 text-xl group cursor-pointer">
              <i className="fa-regular fa-paper-plane group-hover:text-accent duration-200 "></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chatbot;
