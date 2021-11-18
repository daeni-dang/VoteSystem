import React, {useState, useEffect} from 'react';
import styles_test from './mainVoter.css';
import CandiAppliImg from '../Img/candiAppli.png';
import Nav from '../Main/nav';

import axios from 'axios';
import { Link } from 'react-router-dom';

export default function MainVoter() {
    let [userID, setUserID] = useState([]);
    let [elections, setElections] = useState([]);
    let [count, setCount] = useState([]);

    // user의 선거 불러오기
    const getUserElection = async() => {
        const url = "http://localhost:8000/getUserElection";
        await axios.post(url,{
            id:"sieun"
        })
        .then(function(response) {
            setElections(response.data);
            console.log("성공");
        })
        .catch(function(error) {
            console.log("실패");
        })
    };

    useEffect(()=>{
        getUserElection();
        setUserID("sieun");
        setCount(1);
    },[])

    function increaseCount() {
        setCount(count+1)
    }

    return (
        <>
            <Nav Type={"Voter"}/>

            <div id="outer_form_mainVoter">
            <div id="container_mainVoter">
            <div id="title2"><p id="title_mainVoter">투표 가능한 선거리스트</p></div>
                <div id="form_border_mainVoter">
                    {elections.map(election => (
                        <div className="eachElection_mainVoter">
                            <div className="Count_mainVoter">{election.index}.</div>
                            {election.election_status=="0" && <button className="mainVoterPage_Button" id="showResult_mainVoter">결과보기</button>}
                            {election.election_status=="1" && election.voting_status=="0" && <button className="mainVoterPage_Button" id="voteButton_mainVoter">투표하기</button>}
                            {election.election_status=="1" && election.voting_status=="1" && <button className="mainVoterPage_Button" id="complete_mainVoter">투표완료</button>}
                            <div className="electionName_mainVoter">{election.election_name}</div>
                            <div className="electionPeriod_mainVoter">선거 기간 : {election.start_date} ~ {election.end_date}</div>
                        </div>
                    ))}
                </div>
                <div id="bottom_mainVoter">
                    <img src={CandiAppliImg} id="candiAppli_img_mainVoter"/>
                    <Link to='/candidateInput'><button className="mainVoterPage_Button" id="candiAppli_button_mainVoter">후보자 신청하기</button></Link>
                </div>
            </div>
            </div>
        </>
    );
}