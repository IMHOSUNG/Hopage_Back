import '../config/firebaseconfig';
import './configtype';
import firebase from 'firebase';

// 로그인 함수
export const fbLogin = async(email:string, password:string) => {

    try{
        await firebase.auth().signInWithEmailAndPassword(email,password).then(
            (userinfo:any) => {
                console.log(userinfo);
                if(userinfo.user.emailVerified === false){                  
                    throw "verifyfail";
                }
                return ({error : false, log : "login_success" ,user : userinfo})
            }
        )
    }
    catch(error){
        if(error === "verifyfail"){
            firebase.auth().signOut();
            return ({error : true, log :"verify_fail" ,userinfo : null})

        }else{
            return ({error : true, log :"login_fail", userinfo : null})
        }
    }
};

// 로그 아웃 함수
export const fbLogout = async() => {

    const user = firebase.auth().currentUser;
    try{
        if(user){
            await firebase.auth().signOut().then(
                () =>{
                    return({error : false , log: "logout_success"})
                }
            )
        }else{
                return({error:true, log:"logout_fail"})
        }

    }
    catch(error){
        return({error:true, log: error.toString()})
    }
};

// 이메일 인증 + 회원 등록 함수
export const fbSignUp = async(email:string, password:string) => {

    try{

        if(password.length < 6){

            console.log('password rule error');
            return
        }
        
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(async(user:any)=>{
            //console.log(user);
            await user.sendEmailVerification().then(()=>{

            });
           
        })
        .catch((error)=>{

        })

    }catch(error){

    }


};

// 이미 로그인 한 유저 유저 이메일 인증
export const fbVerifyEmail = () => {
    const user = firebase.auth().currentUser;
    
    if(user){
        user.sendEmailVerification().then(() => {

        }).catch((error) => {

        });
    }else{

    }
}  

// 회원 탈퇴 함수
export const fbSignOut = (email:string, password:string) => {

    try{
        const user:any = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            email, 
            password,
        );

        user.reauthenticateWithCredential(credential).then(()=> {
            user.delete().then(()=> {

            }).catch(function(error:string) {
                console.log(error)
            });
        }).catch((error:string) => {
            
        });

    }catch(error){
        
    }
}

// 이메일 인증 + 비밀번호 변경 함수 
export const fbSendEmailUpdatePw = async(language="kr",currentEmail:string) => {
    
    const auth = firebase.auth()
    const emailAddress = currentEmail

    //set language type
    auth.languageCode = language

    auth.sendPasswordResetEmail(emailAddress).then(
        () => {
            
        }
    ).catch(
        (error) => {
            console.log(error);
        }
    )
}

// 이메일 인증 x + 비밀번호 변경 함수
export const fbUpdateUserPassword = (email:string, password:string, updatePassword:string) => {

    try{
        const user:any = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            email, 
            password,
        );

        user.reauthenticateWithCredential(credential).then(()=> {
            user.updatePassword(updatePassword).then(()=> {
                
            }).catch(function(error:string) {
                console.log(error)
            });
        }).catch((error:string) => {
            
        });

    }catch(error){
        
    }
}

// 유저 정보 얻어오는 함수 
export const fbGetUserInfo = () => {

    const userinfo = firebase.auth().currentUser;

    if(userinfo){

        return userinfo;

    }else{

    }
}
