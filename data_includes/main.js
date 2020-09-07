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



// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'
Sequence("intro_ID",
	 "consent_form",
	 "initiate_recorder",
	 "audio_check",
	 "questionnaire",	 
	 
"instruct_1_general",
	 
"preload_prac_cb",
"instruct_2_prac_cblock",
"prac_cb",
	 
"preload_pretrain_cb",
"instruct_3_cblock_pretrain",
"pretrain_cb",
"instruct_4_pause_after_cblock_pretrain",
	 
"preload_prac_ncb",
"instruct_5_prac_ncblock",
"prac_ncb",

"preload_pretrain_ncb",
"instruct_6_ncblock_pretrain",
"pretrain_ncb",
"instruct_7_pause_after_ncblock_pretrain",

"instruct_8_0_train",
	 
"preload_train1_cb",
"preload_train1_ncb",
"instruct_8_1_cblock_train1",
"train1_cb",
"instruct_8_1_ncblock_train1",
"train1_ncb",
	 
"preload_train2_cb",
"preload_train2_ncb",
"instruct_8_2_cblock_train2",
"train2_cb", 
"instruct_8_2_ncblock_train2",
"train2_ncb",
"instruct_8_2_pause_after_ncblock_train2.png",

"preload_train3_cb",
"preload_train3_ncb",
"instruct_8_3_cblock_train3",
randomize("train3_cb"),	 
"instruct_8_3_ncblock_train3",
randomize("train3_ncb"),
	 
"preload_train4_cb",
"preload_train4_ncb",
"instruct_8_4_cblock_train4",
"train4_cb",
"instruct_8_4_ncblock_train4",
"train4_ncb",
"instruct_8_4_pause_after_ncblock_train4.png",

"preload_train5_cb",
"preload_train5_ncb",
"preload_train6_cb",
"preload_train6_ncb",
"instruct_8_5_cblock_train5",
"train5_cb",
"instruct_8_5_ncblock_train5",
"train5_ncb",
"instruct_8_6_cblock_train6",
"train6_cb",
"instruct_8_6_ncblock_train6",
"train6_ncb",	 
	 
"instruct_9_0_general_test",
"preload_test_cb",
"instruct_9_1_cblock_test",
"test_cb",
	 
"preload_test_ncb",
"instruct_9_2_ncblock_test",
"test_ncb",
	 
"comment",
"send",
"instruct_9_3_test_uploading",	 
"final");


CheckPreloaded("prac_cb", 5000)
    .label("preload_prac_cb");   
CheckPreloaded("prac_ncb", 5000)
    .label("preload_prac_ncb");
 
CheckPreloaded("pretrain_cb", 5000)
    .label("preload_pretrain_cb");
CheckPreloaded("pretrain_ncb", 5000)
    .label("preload_pretrain_ncb");

CheckPreloaded("train1_cb", 5000)
    .label("preload_train1_cb");
CheckPreloaded("train1_ncb", 5000)
    .label("preload_train1_ncb");

CheckPreloaded("train2_cb", 5000)
    .label("preload_train2_cb");
CheckPreloaded("train2_ncb", 5000)
    .label("preload_train2_ncb");

CheckPreloaded("train3_cb", 5000)
    .label("preload_train3_cb");
CheckPreloaded("train3_ncb", 5000)
    .label("preload_train3_ncb");

CheckPreloaded("train4_cb", 5000)
    .label("preload_train4_cb");
CheckPreloaded("train4_ncb", 5000)
    .label("preload_train4_ncb");

CheckPreloaded("train5_cb", 5000)
    .label("preload_train5_cb");
CheckPreloaded("train5_ncb", 5000)
    .label("preload_train5_ncb");

CheckPreloaded("train6_cb", 5000)
    .label("preload_train6_cb");
CheckPreloaded("train6_ncb", 5000)
    .label("preload_train6_ncb");


CheckPreloaded("test_cb", 5000)
    .label("preload_test_cb");

CheckPreloaded("test_ncb", 5000)
    .label("preload_test_ncb");

//start the recorder and send result files to the server
Template(GetTable("intro_recorder.csv"),
    ir =>
    InitiateRecorder("https://uni-potsdam.de/phraseproduction/exp2/upload-recording.php", ir.line1)
        .label("initiate_recorder")
)



Template(GetTable("intro_ID.csv"),
    iid =>
    newTrial("intro_ID",
        defaultText
            .print()
        ,
        newText("instr_1", iid.line1)
            .css("border", "solid 1px white")
            .print()
        ,
        newButton("instr_button", "Fortfahren")
            .center()
            .size(100, 30)
            .css("border", "solid 1px white")
            .print()
            .wait()
    )
);

newTrial("intro_ID_sample",
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


Template(GetTable("consent_form.csv"),
    cf =>
    newTrial("consent_form",
        defaultText
            .print()
        ,
        newText("line1", cf.line1)
            .css("border", "solid 10px white")
        ,
        newCanvas("consent_canvas", 800, 400)
            .add(0, 0, getText("line1"))
            .print()
        ,
        newButton("Ich stimme zu.")
            .print()
            .center()
            .log()
            .wait()
    )
);



Template(GetTable("questionnaire.csv"),
    qu =>
    newTrial("questionnaire",
        defaultText
            .print()
        ,
        newText("line1", qu.line1)
            .css("border", "solid 10px white")
        ,
        newTextInput("Gender")
            .size(100, 20)
            .log()
        ,
        newText("line2", qu.line2)
            .css("border", "solid 10px white")
            .after(getTextInput("Gender"))
            .print()
        ,
        newDropDown("Age", "--")
            .add("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100+")
            .print()
            .log()
        ,
        newText("line3", qu.line3)
            .css("border", "solid 10px white")
            .after(getDropDown("Age"))
            .print()
        ,
        newTextInput("Language")
            .size(100, 20)
            .log()
        ,
        newText("line4", qu.line4)
            .css("border", "solid 10px white")
            .after(getTextInput("Language"))
            .print()
        ,
        newImage("yes_hear", "resp_ja.png")
            .size(30,15)
        ,
        newImage("no_hear", "resp_nein.png")
            .size(30,15)
        ,
        newText("line5", qu.line5)
            .css("border", "solid 10px white")
            .after(getImage("yes_hear"))
            .after(getImage("no_hear"))
            .print()
        ,
        newSelector("Hearing")
            .add(getImage("yes_hear") , getImage("no_hear"))
            .select(getImage("no_hear"))
            .log()
        ,
        newImage("yes_imp", "resp_ja.png")
            .size(30,15)
        ,
        newImage("no_imp", "resp_nein.png")
            .size(30,15)
        ,
        newText("line6", qu.line6)
            .css("border", "solid 10px white")
            .after(getImage("yes_imp"))
            .after(getImage("no_imp"))
            .print()
        ,
        newSelector("Impairments_yn")
            .add(getImage("yes_imp") , getImage("no_imp"))
            .select(getImage("no_imp"))
            .log()
        ,
        newTextInput("Impairments")
            .size(100, 20)
            .log()
        ,
        newText("line7", qu.line7)
            .css("border", "solid 10px white")
            .after(getTextInput("Impairments"))
            .print()
        ,
        newTextInput("Prolific_ID")
            .size(100, 20)
            .log()
        ,
        newText("line8", qu.line8)
            .css("border", "solid 10px white")
            .after(getTextInput("Prolific_ID"))
            .print()
        ,
        newButton("qu_test_button", "Fortfahren in den Vollbildmodus.")
            .print()
            .wait(
                getTextInput("Gender")
                .test.text(/[^ ]+/)
                )
            ,
            fullscreen()
    )
);

newTrial("audio_check_test",
        defaultText
            .print()
        ,
        newText("line1", "Bitte nehmen Sie an diesem Experiment nur teil, wenn Sie sich in einem ruhigen Raum befinden.")
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
    newKey("space", " ")
	.log()
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

////////////////////////////////////  templates for practice trials 

Template(GetTable("prac_cblock.csv"),
    prac_cb =>
    newTrial("prac_cb",
    
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
    newImage("prac_picture", prac_cb.picture_file)
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
    .log( "phrase_item", prac_cb.phrase_item )
    .log( "phrase_practice", prac_cb.phrase_practice)
    .log( "condition_exposure", prac_cb.condition_exposure)
    .log( "condition_phrFreq", prac_cb.condition_phrFreq)
);

Template(GetTable("prac_ncblock.csv"),
    prac_ncb =>
    newTrial("prac_ncb",
    
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
    newImage("prac_picture", prac_ncb.picture_file)
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
    .log( "phrase_item", prac_ncb.phrase_item )
    .log( "phrase_practice", prac_ncb.phrase_practice)
    .log( "condition_exposure", prac_ncb.condition_exposure)
    .log( "condition_phrFreq", prac_ncb.condition_phrFreq)
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



Template(GetTable("list1_train1_cblock.csv"),
    train1_cb =>
    newTrial("train1_cb",
    
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
    newImage("train1_picture", train1_cb.picture_file)
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
    .log( "phrase_item", train1_cb.phrase_item )
    .log( "phrase_train1", train1_cb.phrase_train1)
    .log( "condition_exposure", train1_cb.condition_exposure)
    .log( "condition_phrFreq", train1_cb.condition_phrFreq)
);

Template(GetTable("list1_train1_ncblock.csv"),
    train1_ncb =>
    newTrial("train1_ncb",
    
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
    newImage("train1_picture", train1_ncb.picture_file)
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
    .log( "phrase_item", train1_ncb.phrase_item )
    .log( "phrase_train1", train1_ncb.phrase_train1)
    .log( "condition_exposure", train1_ncb.condition_exposure)
    .log( "condition_phrFreq", train1_ncb.condition_phrFreq)
);


Template(GetTable("list1_train2_cblock.csv"),
    train2_cb =>
    newTrial("train2_cb",
    
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
    newMediaRecorder("train2_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train2_picture", train2_cb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train2_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train2_picture")
        .remove()
    ,
    getMediaRecorder("train2_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train2_cb.phrase_item)
    .log( "phrase_train2", train2_cb.phrase_train2)
    .log( "condition_exposure", train2_cb.condition_exposure)
    .log( "condition_phrFreq", train2_cb.condition_phrFreq)
);

Template(GetTable("list1_train2_ncblock.csv"),
    train2_ncb =>
    newTrial("train2_ncb",
    
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
    newMediaRecorder("train2_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train2_picture", train2_ncb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train2_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train2_picture")
        .remove()
    ,
    getMediaRecorder("train2_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train2_ncb.phrase_item )
    .log( "phrase_train2", train2_ncb.phrase_train2)
    .log( "condition_exposure", train2_ncb.condition_exposure)
    .log( "condition_phrFreq", train2_ncb.condition_phrFreq)
);

Template(GetTable("list1_train3_cblock.csv"),
    train3_cb =>
    newTrial("train3_cb",
    
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
    newMediaRecorder("train3_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train3_picture", train3_cb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train3_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train3_picture")
        .remove()
    ,
    getMediaRecorder("train3_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train3_cb.phrase_item)
    .log( "phrase_train3", train3_cb.phrase_train3)
    .log( "condition_exposure", train3_cb.condition_exposure)
    .log( "condition_phrFreq", train3_cb.condition_phrFreq)
);

Template(GetTable("list1_train3_ncblock.csv"),
    train3_ncb =>
    newTrial("train3_ncb",
    
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
    newMediaRecorder("train3_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train3_picture", train3_ncb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train3_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train3_picture")
        .remove()
    ,
    getMediaRecorder("train3_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train3_ncb.phrase_item )
    .log( "phrase_train3", train3_ncb.phrase_train3)
    .log( "condition_exposure", train3_ncb.condition_exposure)
    .log( "condition_phrFreq", train3_ncb.condition_phrFreq)
);

Template(GetTable("list1_train4_cblock.csv"),
    train4_cb =>
    newTrial("train4_cb",
    
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
    newMediaRecorder("train4_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train4_picture", train4_cb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train4_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train4_picture")
        .remove()
    ,
    getMediaRecorder("train4_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train4_cb.phrase_item)
    .log( "phrase_train4", train4_cb.phrase_train4)
    .log( "condition_exposure", train4_cb.condition_exposure)
    .log( "condition_phrFreq", train4_cb.condition_phrFreq)
);

Template(GetTable("list1_train4_ncblock.csv"),
    train4_ncb =>
    newTrial("train4_ncb",
    
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
    newMediaRecorder("train4_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train4_picture", train4_ncb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train4_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train4_picture")
        .remove()
    ,
    getMediaRecorder("train4_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train4_ncb.phrase_item )
    .log( "phrase_train4", train4_ncb.phrase_train4)
    .log( "condition_exposure", train4_ncb.condition_exposure)
    .log( "condition_phrFreq", train4_ncb.condition_phrFreq)
);

Template(GetTable("list1_train5_cblock.csv"),
    train5_cb =>
    newTrial("train5_cb",
    
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
    newMediaRecorder("train5_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train5_picture", train5_cb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train5_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train5_picture")
        .remove()
    ,
    getMediaRecorder("train5_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train5_cb.phrase_item)
    .log( "phrase_train5", train5_cb.phrase_train5)
    .log( "condition_exposure", train5_cb.condition_exposure)
    .log( "condition_phrFreq", train5_cb.condition_phrFreq)
);

Template(GetTable("list1_train5_ncblock.csv"),
    train5_ncb =>
    newTrial("train5_ncb",
    
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
    newMediaRecorder("train5_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train5_picture", train5_ncb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train5_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train5_picture")
        .remove()
    ,
    getMediaRecorder("train5_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train5_ncb.phrase_item )
    .log( "phrase_train5", train5_ncb.phrase_train5)
    .log( "condition_exposure", train5_ncb.condition_exposure)
    .log( "condition_phrFreq", train5_ncb.condition_phrFreq)
);

Template(GetTable("list1_train6_cblock.csv"),
    train6_cb =>
    newTrial("train6_cb",
    
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
    newMediaRecorder("train6_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train6_picture", train6_cb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train6_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train6_picture")
        .remove()
    ,
    getMediaRecorder("train6_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train6_cb.phrase_item)
    .log( "phrase_train6", train6_cb.phrase_train6)
    .log( "condition_exposure", train6_cb.condition_exposure)
    .log( "condition_phrFreq", train6_cb.condition_phrFreq)
);

Template(GetTable("list1_train6_ncblock.csv"),
    train6_ncb =>
    newTrial("train6_ncb",
    
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
    newMediaRecorder("train6_recorder", "audio")
        .hidden()
        .record()
        .log()
    ,
    newImage("train6_picture", train6_ncb.picture_file)
        .size(300, 300)
        .print()
        .log()
    ,
    newTimer("train6_trial", 3000)
        .start()
        .wait()
    ,
    getImage("train6_picture")
        .remove()
    ,
    getMediaRecorder("train6_recorder")
        .stop()
        .remove()
    ,
    newTimer("post_trial", 1000)
        .start()
        .wait()
        .log()
    )
    .log( "sub_id"     , getVar("ID")    )
    .log( "phrase_item", train6_ncb.phrase_item )
    .log( "phrase_train6", train6_ncb.phrase_train6)
    .log( "condition_exposure", train6_ncb.condition_exposure)
    .log( "condition_phrFreq", train6_ncb.condition_phrFreq)
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


Template(GetTable("feedback.csv"),
    fb =>
        newTrial("comment",
            newText(fb.line1)
                .print()
            ,
            newTextInput("feedback")
                .settings.size(400, 50)
                .css("border", "solid 2px grey")
                .settings.log()
                .print()
            ,
            newButton("comment_end_button", "Fortfahren")
                .css("border", "solid 5px white")
                .print()
                .wait()
        )
)


SendResults("send");

Template(GetTable("final_test.csv"),
    fin =>
        newTrial("final",
            exitFullscreen()
            ,
            newText(fin.line1)
                .print()
            ,
            newButton("void")
                .wait()
        )
);

newTrial("final_sample",
    newText("<p>Thank you for your participation!</p>")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/'>Click here to validate your participation.</a></p>")
        .print()
    ,
    newButton("void")
        .wait()
);
