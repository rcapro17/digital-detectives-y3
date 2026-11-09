'use strict';
(function(){
 const config=window.DETECTIVE_FIREBASE_CONFIG;
 if(!config?.apiKey||!config?.projectId){window.submitToTeacher=async()=>setCloudStatus('Online submissions are not connected yet. Download the evidence JSON and submit it to your teacher.',false);return;}
 if(!window.firebase){window.submitToTeacher=async()=>setCloudStatus('Firebase could not load. Check your network and download evidence as a backup.',false);return;}
 try{
  if(!firebase.apps.length)firebase.initializeApp(config);
  const auth=firebase.auth(),db=firebase.firestore();
  const authReady=auth.signInAnonymously();
  window.submitToTeacher=async data=>{
   const button=document.getElementById('submitResult');button.disabled=true;
   setCloudStatus('Sending your evidence to your teacher…');
   try{
    const signedIn=await authReady;
    const uid=signedIn.user.uid;
    await db.collection('submissions').doc(uid).set({...data,updatedAt:firebase.firestore.FieldValue.serverTimestamp(),submittedAt:firebase.firestore.FieldValue.serverTimestamp(),studentUid:uid},{merge:true});
    setCloudStatus('✅ Successfully submitted! Your teacher can now see your work. Keep this screen open for checking.',true);
    button.textContent='✓ Submitted (send update)';
   }catch(err){setCloudStatus('Could not send: '+(err?.message||'network error')+'. Download the evidence JSON as backup.',false)}finally{button.disabled=false}
  };
 }catch(e){window.submitToTeacher=async()=>setCloudStatus('Online connection error: '+e.message,false)}
})();
