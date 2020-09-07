PennController.ResetPrefix(null);  // Initiates PennController

var showProgressBar = true;
//var progressBarText = "Fortschritt";

//edit text pop up for voice recording
let replaceConsentMic = ()=>{
        let consentLink = $(".PennController-PennController a.Message-continue-link");
        if (consentLink.length > 0 && consentLink[0].innerHTML.match(/^By clicking this link I understand that I grant this experiment's script access to my recording device/))
            consentLink.html("Durch klicken erteile ich diesem Skript Zugriff auf mein Mikrofon.");
        else
            window.requestAnimationFrame( replaceConsentMic );
};

window.requestAnimationFrame( replaceConsentMic );

const replacePreloadingMessage = ()=>{
    const preloadingMessage = $(".PennController-PennController > div");
    if (preloadingMessage.length > 0 && preloadingMessage[0].innerHTML.match(/^<p>Please wait while the resources are preloading/))
        preloadingMessage.html("<p>Laden, bitte warten</p>");
    window.requestAnimationFrame( replacePreloadingMessage );
};
window.requestAnimationFrame( replacePreloadingMessage );

const replaceUploadingMessage = ()=>{
    const uploadingMessage = $(".PennController-PennController > p");
    if (uploadingMessage.length > 0 && uploadingMessage[0].innerHTML.match(/^Please wait while the archive of your recordings is being uploaded to the server/))
        uploadingMessage.html("Bitte warten Sie, bis das Archiv Ihrer Aufnahmen auf den Server hochgeladen wurde. Dies kann einige Minuten dauern.");
    window.requestAnimationFrame( replaceUploadingMessage );
};
window.requestAnimationFrame( replaceUploadingMessage );

//start the recorder and send result files to the server
PennController.InitiateRecorder("https://uni-potsdam.de/phraseproduction/exp2/upload-recording.php")
	.label("initiate_recorder");

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence("intro_ID",
"initiate_recorder",
"audio_check_test",
"instruct_1_general",
	 
"preload_prac_cblock",
"instruct_2_prac_cblock",
"prac_cblock",
	 
"preload_pretrain_cb",
"instruct_3_cblock_pretrain",
"pretrain_cb",
"instruct_4_pause_after_cblock_pretrain",
	 
"preload_prac_ncblock",
"instruct_5_prac_ncblock",
"prac_ncblock",

"preload_pretrain_ncb",
"instruct_6_ncblock_pretrain",
"pretrain_ncb",
"instruct_7_pause_after_ncblock_pretrain",

"instruct_8_0_train",
"instruct_8_1_cblock_train1",
"instruct_8_1_ncblock_train1",
"instruct_8_2_cblock_train2",
"instruct_8_2_ncblock_train2",
"instruct_8_2_pause_after_ncblock_train2.png",
	 
"instruct_8_3_cblock_train3",
"instruct_8_3_ncblock_train3",
"instruct_8_4_cblock_train4",
"instruct_8_4_ncblock_train4",
"instruct_8_4_pause_after_ncblock_train4.png",

"instruct_8_5_cblock_train5",
"instruct_8_5_ncblock_train5",
"instruct_8_6_cblock_train6",
"instruct_8_6_ncblock_train6",
	 
"instruct_9_0_general_test",
"preload_test_cb",
"instruct_9_1_cblock_test",
"test_cb",
	 
"preload_test_ncb",
"instruct_9_2_ncblock_test",
"test_ncb",
	 
"send",
"instruct_9_3_test_uploading",	 
"final");


CheckPreloaded("prac_cblock", 5000)
    .label("preload_prac_cblock");
   
CheckPreloaded("prac_ncblock", 5000)
    .label("preload_prac_ncblock");
 
CheckPreloaded("pretrain_cblock", 5000)
    .label("preload_pretrain_cblock");

CheckPreloaded("pretrain_ncblock", 5000)
    .label("preload_pretrain_ncblock");

CheckPreloaded("train1", 5000)
    .label("preload_train1");

CheckPreloaded("test_cb", 5000)
    .label("preload_test_cb");

CheckPreloaded("test_ncb", 5000)
    .label("preload_test_ncb");

newTrial("intro_ID",
    defaultText
        .print()
    ,
    newText("<p>Welcome!</p>"),
    newText("<p>In this experiment, your task is to describe pictures in various ways.</p>"),
    newText("<p>Please enter your ID</p>"),
    newTextInput("inputID")
        .print()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") )
    ,
    newButton("Continue")
        .print()
        .wait()
)
.log( "ID" , getVar("ID") );


newTrial("audio_check_test",
        defaultText
            .print()
        ,
        newText("line1", "Bitte nehmen Sie an diesem Experiment nur teil, wenn Sie sich in einem ruhigen Raum befinden.")
            .css("border", "solid 10px white")
        ,
        newText("line2", "Bevor wir fortfahren, überprüfen Sie bitte, ob Ihr Mikrofon ordnungsgemäß funktioniert und wie laut Sie sprechen müssen, um eine gute Aufnahme zu erhalten.")
            .css("border", "solid 10px white")
        ,
        newText("line3", "Führen Sie dazu die folgenden Schritte (wenn nötig mehrmals) aus:")
            .css("border", "solid 10px white")
        ,
        newText("line4", "1. Klicken Sie auf die Aufnahmetaste („Record“).")
            .css("border", "solid 10px white")
        ,
        newText("line5", "2. Sagen Sie die Worte „Test, Test, Test.“")
            .css("border", "solid 10px white")
        ,
        newText("line6", "3. Klicken Sie auf die Schaltfläche „Stop“.")
            .css("border", "solid 10px white")
        ,
        newText("line7", "4. Klicken Sie auf die Wiedergabetaste (▷), um zu überprüfen, ob die Aufnahme in Ordnung ist und ob Sie laut genug sprechen.")
            .css("border", "solid 10px white")
        ,
        newMediaRecorder("ac_recorder", "audio")
            .center()
            .print()
        ,
        newText("line8", "Wenn alles in Ordnung ist, klicken Sie bitte auf „Fortfahren“. Wenn die Audioqualität der Aufnahme schlecht ist, obwohl Sie ziemlich laut sprechen, setzen Sie das Experiment bitte nicht (mit Ihrem aktuellen Computer und Mikrofon) fort.")
            .css("border", "solid 10px white")
        ,
        newButton("ac_test_button", "Fortfahren")
            .center()
            .size(100, 30)
            .css("border", "solid 5px white")
            .print()
            .wait(getMediaRecorder("ac_recorder").test.recorded())
    )

Template(GetTable("audio_check.csv"),
    ac =>
    newTrial("audio_check",
        defaultText
            .print()
        ,
        newText("line1", ac.line1)
            .css("border", "solid 10px white")
        ,
        newText("line2", ac.line2)
            .css("border", "solid 10px white")
        ,
        newText("line3", ac.line3)
            .css("border", "solid 10px white")
        ,
        newText("line4", ac.line4)
            .css("border", "solid 10px white")
        ,
        newText("line5", ac.line5)
            .css("border", "solid 10px white")
        ,
        newText("line6", ac.line6)
            .css("border", "solid 10px white")
        ,
        newText("line7", ac.line7)
            .css("border", "solid 10px white")
        ,
        newMediaRecorder("ac_recorder", "audio")
            .center()
            .print()
        ,
        newText("line8", ac.line8)
            .css("border", "solid 10px white")
        ,
        newButton("ac_test_button", "Fortfahren")
            .center()
            .size(100, 30)
            .css("border", "solid 5px white")
            .print()
            .wait(getMediaRecorder("ac_recorder").test.recorded())
    )
);

newTrial("instruct_1_general",
    defaultText
        .print()
    ,
    newImage("pic_instruct_1_general", "instruct_1_general.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", " press the spacebar to continue")
        .print()
        .wait()
);

newTrial("instruct_2_prac_cblock",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_2_prac_cblock.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);


newTrial("instruct_3_cblock_pretrain",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_3_cblock_pretrain.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);


newTrial("instruct_4_pause_after_cblock_pretrain",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_4_pause_after_cblock_pretrain.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);


newTrial("instruct_5_prac_ncblock",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_5_prac_ncblock.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);


newTrial("instruct_6_ncblock_pretrain",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_6_ncblock_pretrain.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_7_pause_after_ncblock_pretrain",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_7_pause_after_ncblock_pretrain.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue")
        .print()
        .wait()
);


newTrial("instruct_8_0_train",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_0_train.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_1_cblock_train1",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_1_cblock_train1.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);


newTrial("instruct_8_1_ncblock_train1",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_1_ncblock_train1.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_2_cblock_train2",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_2_cblock_train2.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_2_ncblock_train2",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_2_ncblock_train2.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_2_pause_after_ncblock_train2",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_2_pause_after_ncblock_train2.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);


newTrial("instruct_8_3_cblock_train3",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_3_cblock_train3.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_3_ncblock_train3",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_3_ncblock_train3.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_4_cblock_train4",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_4_cblock_train4.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_4_ncblock_train4",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_4_ncblock_train4.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_4_pause_after_ncblock_train4",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_4_pause_after_ncblock_train4.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);


newTrial("instruct_8_5_cblock_train5",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_5_cblock_train5.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_5_ncblock_train5",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_5_ncblock_train5.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_6_cblock_train6",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_6_cblock_train6.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_6_ncblock_train6",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_6_ncblock_train6.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_8_6_pause_after_ncblock_train6",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_8_6_pause_after_ncblock_train6.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_9_0_general_test",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_9_0_general_test.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_9_1_cblock_test",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_9_1_cblock_test.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_9_2_ncblock_test",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_9_2_ncblock_test.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to continue to start the session")
        .print()
        .wait()
);

newTrial("instruct_9_3_test_uploading",
    defaultText
        .print()
    ,
    newImage("pic_instruct", "instruct_9_3_test_uploading.png")
        .size(1280, 720)
        .print()
    ,
    newButton("continue", "Click here to complete your participation")
        .print()
        .wait()
);

//// templates for practice trials 

Template(GetTable("prac_cblock.csv"),
    prac_cblock =>
    newTrial("prac_cblock",
    
    newImage("fixation_cross", "fixation.png")
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("prac_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("prac_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("prac_picture", prac_cblock.picture_file)
        .size(300, 300)
        .print()
    ,
    newTimer("prac_trial", 3000)
        .start()
        .wait()
        .log()
    ,
    getImage("prac_picture")
        .remove()
    ,
    getMediaRecorder("prac_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", prac_cblock.phrase_item )
    .log( "phrase_practice", prac_cblock.phrase_practice)
    .log( "condition_exposure", prac_cblock.condition_exposure)
    .log( "condition_phrFreq", prac_cblock.condition_phrFreq)
);

Template(GetTable("prac_ncblock.csv"),
    prac_ncblock =>
    newTrial("prac_ncblock",
    
    newImage("fixation_cross", "fixation.png")
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("prac_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("prac_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("prac_picture", prac_ncblock.picture_file)
        .size(300, 300)
        .print()
    ,
    newTimer("prac_trial", 3000)
        .start()
        .wait()
        .log()
    ,
    getImage("prac_picture")
        .remove()
    ,
    getMediaRecorder("prac_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", prac_ncblock.phrase_item )
    .log( "phrase_practice", prac_ncblock.phrase_practice)
    .log( "condition_exposure", prac_ncblock.condition_exposure)
    .log( "condition_phrFreq", prac_ncblock.condition_phrFreq)
);


//////templates for trials during pretrain, train and test session 

Template(GetTable("list1_pretrain_cblock.csv"),
    pretrain_cb =>
    newTrial("pretrain_cb",
    
    newImage("fixation_cross", "fixation.png")
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("pretrain_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("pretrain_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("pretrain_picture", pretrain_cb.picture_file)
        .size(300, 300)
        .print()
    ,
    newTimer("pretrain_trial", 3000)
        .start()
        .wait()
        .log()
    ,
    getImage("pretrain_picture")
        .remove()
    ,
    getMediaRecorder("pretrain_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", pretrain_cb.phrase_item )
    .log( "phrase_pretrain", pretrain_cb.phrase_pretrain)
    .log( "condition_exposure", pretrain_cb.condition_exposure)
    .log( "condition_phrFreq", pretrain_cb.condition_phrFreq)
);


Template(GetTable("list1_pretrain_ncblock.csv"),
    pretrain_ncb =>
    newTrial("pretrain_cb",
    
    newImage("fixation_cross", "fixation.png")
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("pretrain_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("pretrain_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("pretrain_picture", pretrain_ncb.picture_file)
        .size(300, 300)
        .print()
    ,
    newTimer("pretrain_trial", 3000)
        .start()
        .wait()
        .log()
    ,
    getImage("pretrain_picture")
        .remove()
    ,
    getMediaRecorder("pretrain_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", pretrain_ncb.phrase_item )
    .log( "phrase_pretrain", pretrain_ncb.phrase_pretrain)
    .log( "condition_exposure", pretrain_ncb.condition_exposure)
    .log( "condition_phrFreq", pretrain_ncb.condition_phrFreq)
);

Template(GetTable("list1_train.csv"),
    train1 =>
    newTrial("train1",
    
    newImage("fixation_cross", "fixation.png")
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("train1_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train1_picture", train1.picture_file_train1)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train1_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train1_picture")
        .remove()
    ,
    getMediaRecorder("train1_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train1.phrase_item )
    .log( "phrase_train1", train1.phrase_train1)
    .log( "condition_exposure", train1.condition_exposure)
    .log( "condition_phrFreq", train1.condition_phrFreq)
);

Template(GetTable("list1_test_cblock.csv"),
    test_cb =>
    newTrial("test_cb",
    
    newImage("fixation_cross", "fixation.png")
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("test_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("test_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("test_picture", test_cb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("test_trial", 3000)
        .start()
        .wait()
    ,
    getImage("test_picture")
        .remove()
    ,
    getMediaRecorder("test_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", test_cb.phrase_item )
    .log( "phrase_test", test_cb.phrase_test )
    .log( "condition_exposure", test_cb.condition_exposure)
    .log( "condition_phrFreq", test_cb.condition_phrFreq)
);

Template(GetTable("list1_test_ncblock.csv"),
    test_ncb =>
    newTrial("test_ncb",
    
    newImage("fixation_cross", "fixation.png")
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("test_fixation", 500)
        .start()
        .wait()
    ,
    getImage("fixation_cross")
        .remove()
    ,
    newMediaRecorder("test_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("test_picture", test_ncb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("test_trial", 3000)
        .start()
        .wait()
    ,
    getImage("test_picture")
        .remove()
    ,
    getMediaRecorder("test_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", test_ncb.phrase_item )
    .log( "phrase_test", test_ncb.phrase_test )
    .log( "condition_exposure", test_ncb.condition_exposure)
    .log( "condition_phrFreq", test_ncb.condition_phrFreq)
);

SendResults("send");

newTrial("final",
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
);
