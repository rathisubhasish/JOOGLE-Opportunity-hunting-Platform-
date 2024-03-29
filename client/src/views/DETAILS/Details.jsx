import React, {useEffect, useState, useContext} from 'react';
import { Header, Loading } from '../../components/components';
import { useParams } from 'react-router-dom';
import "./Details.css";
import Img from "../../assets/images/global/card/back.jpg";
import CImg from "../../assets/images/global/companies/bmw-2-logo-svgrepo-com.svg";
import explorePost from '../../api/explorePost';
import moment from 'moment';
import { UserContext } from "../../UserContext";
import cancelAppliedpost from '../../api/cancelAppliedPost';
import { toast } from "react-toastify";
import applyPost from '../../api/applyPost';
const Details = () => { 
  const {loggedInUserId} = useContext(UserContext);
  const [postDetail, setPostDetail] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
 
  const { postId } = useParams();
  const [remainingDays, setRemainingDays] = useState("");
  const [registeredCount, setRegisteredCount] = useState(0);
  const [showSalaryContainer, setSalaryContainer] = useState(false);
  const [showWorkingDaysContainer, setWorkingDaysContainer] = useState(false);
  const [showPrizesContainer, setShowPrizesContainer] = useState(false);
  const [showFeesContainer, setShowFeesContainer] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [explorePostLoading, setExplorePostLoading] = useState(true);

  useEffect(() => { 
    setExplorePostLoading(true);
    const ExplorePost = explorePost({postId})
      .then((actualData) => {
        setPostDetail(actualData.data[0]);
        const daysCalc = moment(actualData.data[0].endDate).diff(moment().format("MM/DD/YYYY"),'days');
        setRegisteredCount(actualData.data[0].registered.length);
        setRemainingDays(daysCalc);
        if(actualData.data[0].category === "Jobs")
        {
            setWorkingDaysContainer(true);
            setSalaryContainer(true);
        }
        else if(actualData.data[0].category === "Hiring Challenges")
        {
            setShowPrizesContainer(true);
        }
        else if(actualData.data[0].category === "Bootcamps")
        {
            setShowFeesContainer(true);
        }

        for(let value of Object.values(actualData.data[0].registered)) {
            setAlreadyApplied(false);
            if(value._id===loggedInUserId)
            {
                setAlreadyApplied(true);
                break;
            }
        }
        setExplorePostLoading(false);
      })
      .catch((err) => {
        setExplorePostLoading(false);
        console.error(err.message)
        }
      );
    return () => ExplorePost;
  }, [alreadyApplied]);

  const handleApplyPost = async (e) => {
    e.preventDefault();
    window.scrollTo({top : 0, behavior: 'smooth'});
    try {
      const res = await applyPost({postId});
      if (res.error) toast.error(res.error, {
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      else {
        toast.success(res.message, {
          autoClose: 4000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAlreadyApplied(true);
      }
    } catch (err) {
        setAlreadyApplied(false);
      toast.error("Server error, please try later!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleCancelApplication = async (e) => {
    e.preventDefault();
    window.scrollTo({top : 0, behavior: 'smooth'});
    try {
      const res = await cancelAppliedpost({postId});
      if (res.error) toast.error(res.error, {
        autoClose: 4000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      else {
        toast.success(res.message, {
          autoClose: 4000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setAlreadyApplied(false);
      }
    } catch (err) {
        setAlreadyApplied(true);
      toast.error("Server error, please try later!", {
        autoClose: 2000,
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <>

        <Header headType="DetailHeader" headText=""/>
        {explorePostLoading ? <Loading loadType="screenLoad"/> :''}
        <div className="details-container">
            <div className="details-items">
                <div className="detail-cover-container">
                    <span className='detail-cover'>
                    <img src={Img} alt="" className='cover-img'/>
                    </span>  
                </div>
                <div className="detail-company-info-logo">
                    <span className='detail-company-logo-container'>
                        <img src={CImg} alt="logo" className='detail-company-logo'/>
                    </span>
                </div>
                <br />
                <br />
                <div className="detail-header-container">
                    <p className='detail-post-name'>{postDetail.postName}</p>
                    <p className='detail-post-org'>{postDetail.organization}</p>
                </div>
                {
                    remainingDays < 0
                    ?
                    ''
                    :
                    (
                        <>
                            {
                                alreadyApplied
                                ?
                                (
                                    <>
                                        <div className="user-post-action">
                                            <button
                                                id="cancel-apply-btn"
                                                className="floating-detail-action-btn"
                                                onClick={handleCancelApplication}
                                            >
                                                Application CANCEL
                                            </button>
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div className="user-post-action">
                                            <button
                                                id="apply-btn"
                                                className="floating-detail-action-btn"
                                                onClick={handleApplyPost}
                                            >
                                                APPLY
                                            </button>
                                        </div>
                                    </>
                                )
                            }        
                        </>
                    )
                }
                <div className="detail-brief-card-container">
                    <div className="detail-brief-card-items">
                        <div className="left-detail-brief-card">
                            <span className="material-icons detail-brief-card-icon">
                                how_to_reg
                            </span>
                            <span className="detail-brief-card-name">
                                {registeredCount} Registered
                            </span>
                        </div>
                        <div className="right-detail-brief-card">
                            <span className="material-icons detail-brief-card-icon">
                                timer
                            </span>
                            <span className="detail-brief-card-name">
                                {
                                    remainingDays < 0
                                    ?
                                    (
                                        <p className='expired-item'>Expired</p>
                                    )
                                    :
                                    (
                                        <>
                                            {remainingDays} days left
                                        </>
                                    )
                                }
                            </span>
                        </div>
                    </div>
                </div>
                
                <label htmlFor="" className='detail-label-content'>About us</label>
                <span className="detail-brief">
                    {postDetail.aboutUs}
                </span>

                <label htmlFor="" className='detail-label-content'>Category</label>
                <span className="detail-brief">
                    {postDetail.category}
                </span>

                <label htmlFor="" className='detail-label-content'>Responsibility</label>
                <span className="detail-brief">
                    {postDetail.responsibility}
                </span>

                <label htmlFor="" className='detail-label-content'>Requirements</label>
                <span className="detail-brief">
                    {postDetail.requirements}
                </span>

                <label htmlFor="" className='detail-label-content'>Important Information</label>
                <div className="detail-brief-card-container">
                    <div className="detail-brief-card-items">
                        <div className="left-detail-brief-card">
                            <span className="material-icons detail-brief-card-icon">
                                location_pin
                            </span>
                            <span className="detail-brief-card-name">
                                {postDetail.location}
                            </span>
                        </div>
                        <div className="right-detail-brief-card">
                            <span className="material-icons detail-brief-card-icon">
                                work_history
                            </span>
                            <span className="detail-brief-card-name">
                                {postDetail.minExperience} - {postDetail.maxExperience} year experience
                            </span>
                        </div>
                    </div>
                    <div className="detail-brief-card-items">
                        <div className="left-detail-brief-card">
                            {showWorkingDaysContainer && (
                            <>
                            <span className="material-icons detail-brief-card-icon">
                                event
                            </span>
                            <span className="detail-brief-card-name">
                            {postDetail.workingDays} days working
                            </span>
                            </>
                            )
                            }
                        </div>
                        <div className="right-detail-brief-card">
                            <span className="material-icons detail-brief-card-icon">
                                event_busy
                            </span>
                            <span className="detail-brief-card-name">
                                Last date {postDetail.endDate}
                            </span>
                        </div>
                    </div>
                </div>
                
                {
                    showPrizesContainer
                    &&
                    (
                        <>
                            <label htmlFor="" className='detail-label-content'>Prizes</label>
                            <div className="detail-brief-card-container">
                                <div className="detail-brief-card-items">
                                    <div className="left-right-detail-brief-card">
                                        <span className="material-icons detail-brief-card-icon">
                                            emoji_events
                                        </span>
                                        <span className="detail-brief-card-name">
                                            1st position - {postDetail.firstPrize}
                                        </span>
                                    </div>
                                </div>
                                <div className="detail-brief-card-items">
                                    <div className="left-right-detail-brief-card">
                                        <span className="material-icons detail-brief-card-icon">
                                            military_tech
                                        </span>
                                        <span className="detail-brief-card-name">
                                            2nd position - {postDetail.secondPrize}
                                        </span>
                                    </div>
                                </div>
                                <div className="detail-brief-card-items">
                                    <div className="left-right-detail-brief-card">
                                        <span className="material-icons detail-brief-card-icon">
                                            military_tech
                                        </span>
                                        <span className="detail-brief-card-name">
                                            3rd position - {postDetail.thirdPrize}
                                        </span>
                                    </div>
                                </div>
                            </div>        
                        </>
                    )
                }
                
                {
                    showSalaryContainer
                    &&
                    (
                        <>
                            <label htmlFor="" className='detail-label-content'>Salary / Stipend</label>
                            <div className="detail-brief-card-container">
                                <div className="detail-brief-card-items">
                                    <div className="left-right-detail-brief-card">
                                        <span className="material-icons detail-brief-card-icon">
                                            local_atm
                                        </span>
                                        <span className="detail-brief-card-name">
                                            {postDetail.salary}
                                        </span>
                                    </div>
                                </div>
                            </div>        
                        </>
                    )
                }
                
                {
                    showFeesContainer
                    &&
                    (
                        <>
                            <label htmlFor="" className='detail-label-content'>Fees</label>
                            <div className="detail-brief-card-container">
                                <div className="detail-brief-card-items">
                                    <div className="left-right-detail-brief-card">
                                        <span className="material-icons detail-brief-card-icon">
                                            attach_money
                                        </span>
                                        <span className="detail-brief-card-name">
                                            {postDetail.fees}
                                        </span>
                                    </div>
                                </div>
                            </div>       
                        </>
                    )
                }
            </div>
        </div>
    </>
  )
};

export default Details;