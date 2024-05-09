import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { stories } from "../../utils/constants";
import { useEffect, useRef, useState } from "react";

const StoryModal = ({ storyIcon, onClose,storyUser }) => {
  // State to track the remaining time for the story
  const [remainingTime, setRemainingTime] = useState(10); // Assuming 10 seconds for the demo
  const [timerWidth, setTimerWidth] = useState(100);
  // Timer function to decrement remaining time every second
  const modalRef = useRef(null);
  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime((prevTime) => prevTime - 1);
        setTimerWidth((remainingTime - 1) * 10); // Adjust timer bar width
      } else {
        onClose();
        clearInterval(timer);
      }
    }, 1000);
    const handleClickOutside = (event) => {
      console.log("event while click", event);
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
        clearInterval(timer);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      clearInterval(timer);
    };
  }, [remainingTime, onClose]);

  return (
    <div className="modal-background">
      <div ref={modalRef} className="modal-content">
      <div className="timer-bar" style={{ width: `${timerWidth}%` }}></div>
      <div>
        <h3 style={{color:"wheat"}}>{storyUser}</h3>
      </div>
        <img src={storyIcon} alt="Story Icon" />
       
        
          <div className="timer">{remainingTime}s</div>
         
      
      </div>
    </div>
  );
};

const StoriesContainer = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
const[selectedUser,setSelectedUser]=useState(null)
  // Event handler to open the modal when a story icon is clicked
  const handleStoryClick = (icon,user) => {
    setSelectedStory(icon);
    setSelectedUser(user)
    setIsModalOpen(true);
  };

  // Event handler to close the modal
  const handleCloseModal = () => {
    setSelectedStory(null);
    setSelectedUser(null)
    setIsModalOpen(false);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7.5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <Slider
        {...settings}
        className="w-full bg-white pt-2.5 pb-1 px-2.5 flex overflow-hidden border rounded"
      >
        {stories.map((s, i) => (
          <div
            className="flex flex-col text-center justify-center items-center p-2 cursor-pointer"
            key={i}
          >
            <div className="w-16 p-[1px] h-16 rounded-full border-2 border-red-500">
              <img
                onClick={() =>
                  handleStoryClick(
                    require(`../../assests/images/logos/${s.image}.webp`),
                    s.title
                  )
                }
                loading="lazy"
                className="rounded-full h-full w-full border border-gray-300 object-cover"
                src={require(`../../assests/images/logos/${s.image}.webp`)}
                draggable="false"
                alt="story"
              />
            </div>
            <span className="text-xs">{s.title}</span>
          </div>
        ))}
      </Slider>
      {isModalOpen && (
        <StoryModal storyUser={selectedUser} storyIcon={selectedStory} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default StoriesContainer;
