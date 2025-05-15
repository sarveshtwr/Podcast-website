"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import regeneratorRuntime from "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  IconArrowDown,
  IconArrowDownBar,
  IconArrowUp,
  IconArrowUpBar,
  IconMicrophoneOff,
  IconPlayerRecordFilled,
  IconX,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FaMicrophone } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";

const InfoModal = ({
  icon,
  title,
  description,
  showModal,
  setShowModal,
  centered = false,
  duration = 2000,
}) => {
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [showModal, duration]);

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className={` ${
            centered
              ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              : "top-10 left-10"
          } flex flex-col items-center gap-3 column fixed z-30 bg-slate-600 opacity-25 text-white text-center p-10 rounded-xl`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p>{icon}</p>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p>{description}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const InstructionModal = ({ setShowModal }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed z-30 bg-white text-slate-800 p-10 rounded-xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* close button */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-10 right-10 text-xl"
        >
          <IconX size={20} />
        </button>
        <h3 className="text-center text-3xl font-bold mb-4">
          Basic Instructions
        </h3>
        <p className="text-lg mb-2">{`1. Say "Open <page name> page" to open navigate to any page`}</p>
        <p className="text-lg mb-2">{`2. Say "I want to create an account" to navigate to the signup page`}</p>
        <p className="text-lg mb-2">{`3. Say "I want to login" to navigate to the login page`}</p>
        <p className="text-lg mb-2">{`4. Say "Move down" to scroll down and vice-versa`}</p>
        <p className="text-lg mb-2">{`5. Say "Move to bottom" to scroll to bottom of page and vice-versa`}</p>
      </motion.div>
    </AnimatePresence>
  );
};

const pageDetails = [
  {
    pageName: "home",
    pagePath: "/",
  },
  {
    pageName: "signup",
    pagePath: "/signup",
  },
  {
    pageName: "login",
    pagePath: "/login",
  },
  {
    pageName: "contact",
    pagePath: "/contact",
  },
  {
    pageName: "about",
    pagePath: "/about",
  },
  {
    pageName: "resetPassword",
    pagePath: "/resetPassword",
  },
  {
    pageName: "productView",
    pagePath: "/productView",
  },
  {
    pageName: "sellerdashboard",
    pagePath: "/seller/sellerdashboard",
  },
  {
    pageName: "addProduct",
    pagePath: "/seller/addProduct",
  },
  {
    pageName: "manageProduct",
    pagePath: "/seller/manageProduct",
  },
  {
    pageName: "sellersignup",
    pagePath: "/seller/sellersignup",
  },
  {
    pageName: "admindashboard",
    pagePath: "/admin/admindashboard",
  },
  {
    pageName: "manageuser",
    pagePath: "/admin/manageuser",
  },
  {
    pageName: "adminprofile",
    pagePath: "/admin/adminprofile",
  },
  {
    pageName: "profile",
    pagePath: "/user/profile",
  },
  {
    pageName: "MyCart",
    pagePath: "/admin/adminprofile",
  },
  {
    pageName: "cheakout",
    pagePath: "/user/cheakout",
  },
];

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [showInstruction, setShowInstruction] = useState(false);
  const [speech, setSpeech] = useState(null);
  const [voices, setVoices] = useState([]);
  const hasRun = useRef(false);
  const router = useRouter();
  const [modalOptions, setModalOptions] = useState({
    icon: <FaMicrophone size={50} />,
    title: "",
    description: "",
    centered: true,
  });

  const fillInputUsingVoice = (cb) => {
    if (typeof window === "undefined") return;
    if (finalTranscript?.toLowerCase().startsWith("enter")) {
      cb();
    }
  };

  const performActionUsingVoice = (triggerCommand, command, cb) => {
    if (typeof window === "undefined") return;
    if (
      finalTranscript?.toLowerCase().startsWith(triggerCommand) &&
      finalTranscript?.toLowerCase().includes(command)
    ) {
      cb();
    }
  };

  const voiceResponse = (text) => {
    if (typeof window === "undefined") return;
    if (speech && window.speechSynthesis) {
      speech.text = text;
      window.speechSynthesis.speak(speech);
    }
  };

  const triggerModal = (
    title,
    description,
    centered = true,
    icon = <FaMicrophone size={50} />
  ) => {
    if (typeof window === "undefined") return;
    setModalOptions({
      icon,
      title,
      description,
      centered,
    });
    setShowModal(true);
  };

  const voicePageNavigator = (pageName) => {
    if (typeof window === "undefined") return;
    const page = pageDetails.find((page) =>
      pageName.toLowerCase().includes(page.pageName.toLowerCase())
    );
    if (page) {
      voiceResponse(`Navigating to ${pageName} page...`);
      triggerModal("Navigating...", `Navigating to ${pageName} page...`);
      router.push(page.pagePath);
      resetTranscript();
    } else {
      console.log("Page not found!");
    }
  };

  const interpretVoiceCommand = () => {
    if (typeof window === "undefined") return;
    console.log("Voice Command: ", transcript);
    if (transcript?.includes("home")) {
      voicePageNavigator("home");
    } else if (transcript?.includes("sign up")) {
      voicePageNavigator("signup");
    } else if (transcript?.includes("login")) {
      voicePageNavigator("login");
    } else if (transcript?.includes("contact")) {
      voicePageNavigator("contact");
    } else if (transcript?.includes("reset password")) {
      voicePageNavigator("reset password");
    } else if (transcript?.includes("hello")) {
      voiceResponse("Hello! How can I help you?");
    } else if (transcript?.includes("goodbye")) {
      voiceResponse("Goodbye! Have a nice day!");
    } else {
      voiceResponse(
        "Sorry, I did not understand that command. Please try again."
      );
    }
  };

  const checkExistenceInTranscript = (commandArray) => {
    if (!finalTranscript) return null;
    return commandArray.find((command) => finalTranscript.includes(command));
  };

  const commands = [
    {
      command: "Open :pageName page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator(pageName);
      },
    },
    {
      command: "I want to create an account",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("signup");
      },
    },
    {
      command: "open home page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("/");
      },
    },
    {
      command: "open register page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("signup");
      },
    },
    {
      command: "open signup page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("signup");
      },
    },
    {
      command: "I want to login",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("login");
      },
    },
    {
      command: "I want to listen podcast",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("browse-podcast");
      },
    },
    {
      command: "I want to contact you",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("contact");
      },
    },
    {
      command: "open manage product page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("manageProduct");
      },
    },
    {
      command: "open login page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("login");
      },
    },
    {
      command: "open cheak out page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("cheakout");
      },
    },

    {
      command: "open contact page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("contact");
      },
    },
    {
      command: "open reset password page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("resetPassword");
      },
    },
    {
      command: "open signup page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("signup");
      },
    },
    {
      command: "open admin dashboard",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("admindashboard");
      },
    },
    {
      command: "open manage user",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("manageuser");
      },
    },
    {
      command: "open admin profile",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("adminprofile");
      },
    },
    {
      command: "open add product",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("addProduct");
      },
    },
    {
      command: "open manage product",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("manageProduct");
      },
    },
    {
      command: "open seller dashboard",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("sellerdashboard");
      },
    },
    {
      command: "open seller sign up",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("sellersignup");
      },
    },
    {
      command: "open user profile",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("profile");
      },
    },
    {
      command: "open cart page",
      callback: (pageName) => {
        console.log("Opening page: ", pageName);
        voicePageNavigator("MyCart");
      },
    },
    {
      command: "show me products",
      callback: (pageName) => {
        router.push("/productView");
        voiceResponse("Showing all products");
      },
    },
    {
      command: "I want to listen podcast",
      callback: (pageName) => {
        router.push("/browse-podcast");
        voiceResponse("Showing all podcasts");
      },
    },
    {
      command: "open podcast",
      callback: (pageName) => {
        router.push("/browse-podcast");
        voiceResponse("Showing all podcasts");
      },
    },
    {
      command: "Mujhe Podcast sunna hai",
      callback: (pageName) => {
        router.push("/browse-podcast");
        voiceResponse("Showing all podcasts");
      },
    },
    {
      command: "Open Browse Podcast",
      callback: (pageName) => {
        router.push("/browse-podcast");
        voiceResponse("Opening Browse Podcast page");
      },
    },
    {
      command: "Open Browse Page",
      callback: (pageName) => {
        router.push("/browse-podcast");
        voiceResponse("Opening Browse Podcast page");
      },
    },
    {
      command: "Open Browse Section",
      callback: (pageName) => {
        router.push("/browse-podcast");
        voiceResponse("Opening Browse Podcast page");
      },
    },
    {
      command: "Mujhe Browse Section dikhaiye",
      callback: (pageName) => {
        router.push("/browse-podcast");
        voiceResponse("Opening Browse Podcast page");
      },
    },
    {
      command: "Mujhe Login Page dikhaiye",
      callback: (pageName) => {
        router.push("/login");
        voiceResponse("Opening login page");
      },
    },
    {
      command: "Mujhe Login Karna Hai",
      callback: (pageName) => {
        router.push("/login");
        voiceResponse("Opening login page");
      },
    },
    {
      command: "Mujhe Signin Karna Hai",
      callback: (pageName) => {
        router.push("/signin");
        voiceResponse("Opening Signin page");
      },
    },
    {
      command: "Mujhe Register Karna Hai",
      callback: (pageName) => {
        router.push("/signin");
        voiceResponse("Opening Signin page");
      },
    },
    {
      command: "Mujhe podcast upload Karna Hai",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "I want to upload podcast",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "Open upload podcast page",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "Open upload podcast section",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "Mujhe podcast upload section dikhaiye",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "Mujhe poadcast add karna hai",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "i want to add poadcast",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "i want to add some poadcast",
      callback: (pageName) => {
        router.push("/artist/add-podcast");
        voiceResponse("Opening upload podcast page");
      },
    },
    {
      command: "move page :direction",
      callback: (direction) => {
        console.log("Moving in direction: ", direction);
        if (direction === "up") {
          window.scrollBy(0, -window.innerHeight);
        } else if (direction === "down") {
          window.scrollBy(0, window.innerHeight);
        }
      },
    },
    {
      command: "scroll :direction",
      callback: (direction) => {
        console.log("Scrolling in direction: ", direction);
        if (direction === "up") {
          window.scrollBy(0, -window.innerHeight);
        } else if (direction === "down") {
          window.scrollBy(0, window.innerHeight);
        }
      },
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    finalTranscript,
  } = useSpeechRecognition({ commands, continuous: true });
  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window === "undefined") return;

    const speechUtterance = new SpeechSynthesisUtterance();
    setSpeech(speechUtterance);

    const synth = window.speechSynthesis;
    const handleVoicesChanged = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (speechUtterance && availableVoices.length > 0) {
        speechUtterance.voice = availableVoices[0];
      }
    };

    if (synth) {
      if ("onvoiceschanged" in synth) {
        synth.onvoiceschanged = handleVoicesChanged;
      } else {
        handleVoicesChanged();
      }
    }

    return () => {
      if (synth && "onvoiceschanged" in synth) {
        synth.onvoiceschanged = null;
      }
    };
  }, []); // No dependencies needed

  // Handle voice commands
  useEffect(() => {
    if (typeof window === "undefined" || !finalTranscript) return;

    if (finalTranscript === "hello vox" || finalTranscript.includes("hello")) {
      resetTranscript();
      interpretVoiceCommand();
      SpeechRecognition.startListening({ continuous: true });
      triggerModal("Voice Assistant", "Hi User, How can I help you?");
    }
    if (finalTranscript === "start listening") {
      resetTranscript();
      voiceResponse("I am listening");
      SpeechRecognition.startListening({ continuous: true });
      triggerModal("Voice Assistant", "I am listening");
    }
    if (finalTranscript.includes("top listening")) {
      resetTranscript();
      voiceResponse("Okay, I will stop listening now");
      SpeechRecognition.stopListening();
      triggerModal(
        "Voice Assistant",
        "Good Bye! Have a nice day!",
        false,
        <IconMicrophoneOff size={50} />
      );
    }
    if (finalTranscript.includes("hello box")) {
      resetTranscript();
      voiceResponse("Hello! How can I help you today?");
      SpeechRecognition.startListening({ continuous: true });
    }
    if (finalTranscript.includes("goodbye box")) {
      voiceResponse("Goodbye! Have a nice day!");
      SpeechRecognition.stopListening();
      triggerModal(
        "Voice Assistant",
        "Good bye! have a nice Day",
        false,
        <IconMicrophoneOff size={50} />
      );
    }
    if (finalTranscript.includes("scroll up")) {
      window.scrollBy(0, -window.innerHeight / 2);
      // trigger info modal here
      // setShowModal(true);
      triggerModal("Scrolling Up");
      resetTranscript();
      triggerModal("Scrolling Up", "", true, <IconArrowUp size={50} />);
    }

    if (finalTranscript.includes("scroll down")) {
      window.scrollBy(0, window.innerHeight / 2);
      // setShowModal(true);
      triggerModal("Scrolling Down");
      resetTranscript();
      triggerModal("Scrolling Down", "", true, <IconArrowDown size={50} />);
    }

    if (finalTranscript.includes("move to bottom")) {
      window.scrollTo(0, document.body.scrollHeight);
      resetTranscript();
      triggerModal(
        "Moving to Bottom",
        "",
        true,
        <IconArrowDownBar size={50} />
      );
    }

    if (finalTranscript.includes("move to top")) {
      window.scrollTo(0, 0);
      resetTranscript();
      triggerModal("Moving to Top", "", true, <IconArrowUpBar size={50} />);
    }
    if (
      finalTranscript.includes("browse products") ||
      finalTranscript.includes("view all products")
    ) {
      resetTranscript();
      voiceResponse("Showing all products");
      router.push("/productView");
    }
  }, [finalTranscript, resetTranscript, interpretVoiceCommand, voiceResponse]);

  // Initial setup
  useEffect(() => {
    if (typeof window === "undefined" || hasRun.current) return;
    hasRun.current = true;
  }, []);

  // Instructions modal
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      setShowInstruction(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!browserSupportsSpeechRecognition) {
    console.log(
      "Your browser does not support speech recognition software! Please try again with a different browser."
    );
  }

  return (
    <VoiceContext.Provider
      value={{
        transcript,
        resetTranscript,
        interpretVoiceCommand,
        fillInputUsingVoice,
        performActionUsingVoice,
        finalTranscript,
        voiceResponse,
        voices,
        triggerModal,
        checkExistenceInTranscript,
      }}
    >
      {children}
      {typeof window !== "undefined" && (
        <>
          <div className="fixed bottom-6 right-6 flex flex-col items-end gap-2 z-50">
            <button
              className="w-12 h-12 rounded-full bg-[#8C52FF] text-white shadow-lg hover:bg-[#7340d3] transition-all duration-200 flex items-center justify-center"
              onClick={() => {
                if (listening) {
                  SpeechRecognition.stopListening();
                } else {
                  SpeechRecognition.startListening();
                }
              }}
            >
              {listening ? (
                <IconPlayerRecordFilled size={24} style={{ color: "white" }} />
              ) : (
                <FaMicrophone size={20} />
              )}
            </button>

            {listening && transcript && (
              <div className="bg-[#8C52FF]/90 text-white px-4 py-2 rounded-lg max-w-xs text-sm backdrop-blur-sm">
                {transcript}
              </div>
            )}
          </div>

          <InfoModal
            {...modalOptions}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
      )}
    </VoiceContext.Provider>
  );
};

const useVoiceContext = () => useContext(VoiceContext);

export default useVoiceContext;
