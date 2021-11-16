import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import styles from './signupVoter.css';
import Nav from '../Main/nav'
import axios from 'axios';

export default function SignupVoter() {
    const [okID, setOkID] = useState([]);
    const [okSSN, setOkSSN] = useState([]);

    useEffect(()=>{
        setOkID("T");
        setOkSSN("T");
    },[])

    function requestSignup() {
        const url = "http://localhost:8000/requestSignup";
        // 예외처리
        if (okID === "F") {
            alert("아이디 중복 확인을 해주세요.");
            return;
        }
        else if (document.getElementById('pwd').value!==document.getElementById('pwd2').value) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        else if (okSSN === "F") {
            alert("본인 확인을 해주세요.");
            return;
        }
        else if (document.getElementById('id').value===""||document.getElementById('pwd').value===""||document.getElementById('pwd2').value===""||
        document.getElementById('name').value===""||document.getElementById('address').value===""||document.getElementById('phonenumber').value==="") {
            alert("모든 항목을 작성해주세요.");
            return;
        }
        while ( document.getElementById('phonenumber').value.includes('-')) {
            document.getElementById('phonenumber').value = document.getElementById('phonenumber').value.replace('-','');
            console.log(document.getElementById('phonenumber').value)
        }

        // 삽입
        axios.put(url,{
            user_ssn:document.getElementById('fssn').value+'-'+document.getElementById('lssn').value,
            id:document.getElementById('id').value,
            pwd:document.getElementById('pwd').value,
            name:document.getElementById('name').value,
            address:document.getElementById('address').value,
            phonenumber:document.getElementById('phonenumber').value
        })
        .then(function(response) {
            if(response.status===204){
                alert('회원가입 실패')
            }
            else {
                alert('회원가입 성공')
                console.log("성공");
            }
        })
        .catch(function(error) {
            alert('서버 연결실패')
            console.log("실패");
        })
    };

    return (
        <>
            <Nav Type={"Voter"}/>
            <div id="title_signup">회원가입</div>
            <div id="outer_form_signup">
                <div id="form_border_signup">
                    <div id="left_form_signup">
                        <div className="each_form_signup">
                            <div className="article_signup">회원 ID</div>
                            <Input placeholder="아이디를 입력하세요.(영어 대소문자 구분)" id="id" className="input_form_signup"/>
                            <button className="signupPage_Button" id="checkInput_signup">중복확인</button>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호</div>
                            <Input type="password" placeholder="알파벳+숫자(영어 대소문자 구분)" id="pwd" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">비밀번호 재확인</div>
                            <Input type="password" placeholder="비밀번호를 다시 한번 입력하세요." id="pwd2" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">회원 이름</div>
                            <Input placeholder="이름를 입력하세요." id="name" className="input_form_signup"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup" id="backmargin_article_signup">주민등록번호</div>
                            <Input className="ssn_signup" placeholder="000000" id="fssn"/>
                            &nbsp;&nbsp;- <Input className="ssn_signup" type="password" placeholder="1234567" id="lssn"/>
                            <button className="signupPage_Button" id="checkInput_signup">본인확인</button>
                        </div>
                    </div>
                    <div id="middle_line_signup"></div>
                    <div id="right_form_signup">
                        <div className="each_form_signup">
                            <div className="article_signup">전화번호</div>
                            <Input type="tel" placeholder="01000000000" className="input_form_signup" id="phonenumber"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup">이메일</div>
                            <Input type="email" placeholder="dongguk@dgu.kr" className="input_form_signup" id="email"/>
                        </div>
                        <div className="each_form_signup">
                            <div className="article_signup" id="backmargin_article_signup">주소</div>
                            <TextField hiddenLabel multiline rows={4} placeholder="주소를 입력하세요." className="input_form_signup" id="address"/>
                        </div>
                    </div>
                    <div id="reg_button_signup">
                        <button className="signupPage_Button" id="requestSignup" onClick={requestSignup}>회원가입</button>
                    </div>
                </div>
                <p>{okID}</p>
                <p>{okSSN}</p>
            </div>

        </>
    );
}