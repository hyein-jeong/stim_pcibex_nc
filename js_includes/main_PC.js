PennController.ResetPrefix(null); // Initiates PennController

Sequence( "intro_ID", "intro_familiarization", randomize("familiarization"), "intro_bare_nouns", randomize("bare_nouns"), "send" , "final" );

// Start typing your code here
newTrial("intro_ID",
    defaultText
        .print()
    ,
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, your task is to describe pictures in various ways.</p>")
,
    newText("<p>Please enter your ID</p>")
    ,
    newTextInput("inputID")
        .print()
    ,
    newVar("ID")
        .global()
        .set( getTextInput("inputID") ),
           newButton("Continue")
        .print()
        .wait()
)
.log( "ID" , getVar("ID") );

newTrial("intro_familiarization",
    defaultText
        .print()
    ,
    newText("<p>First, we'll familiarize you with the pictures.</p>")
        .print()
    ,
    newText("<p>We'll show you each picture along with the name you should use for it during the experiment.</p><br><p><strong>Try to memorize the correct name for each picture!</strong></p>")
        .print()
        ,
    newText("<p>After each picture, press [SPACE] to continue.</p>")
        .print()
    ,
    newButton("Start")
        .print()
        .wait()

);

Template(GetTable("familiarization.csv"),
    fam =>
    newTrial("familiarization",

    newImage("picture", fam.picture_file)
    .size(500, 500)
    .print()
    ,
    newText(fam.n_en)
    .center()
    .settings.css("font-size", "2em")
    .print()
    ,
    newKey("space", " ")
    .wait()
    )
);

newTrial("intro_bare_nouns",
    defaultText
        .print()
    ,
    newText("<p>Now you'll see those same pictures again a few times.</p>")
        .print()
    ,
    newText("<p>Sometimes they will appear larger than or differently colored from before, but you can ignore these differences.</p>")
        .print()
    ,
    newText("<p>Please say the correct name for the picture as quickly as you can.</p>")
        .print()
    ,
    newText("<p>After each picture, press [SPACE] to continue.</p>")
        .print()
    ,
    newButton("Start")
        .print()
        .wait()

);

Template(GetTable("stimuli.csv"),
    bn =>
    newTrial("bare_nouns",

    newImage("fixation_cross", "fixation_cross.png")
    .size(500, 500)
    .print()
    ,
    newTimer("fixation", 500)
    .start()
    .wait()
    ,
    getImage("fixation_cross")
    .remove()
    ,
    newImage("picture", bn.picture_file)
    .size(500, 500)
    .print()
    ,
    newTimer("trial_time", 3000)
    .start()
    .wait()
    ,
    getImage("picture")
    .remove()
    ,
    newKey("space", " ")
    .wait()
    )
   .log( "sub_id"     , getVar("ID")    )
   .log( "n_en"   , bn.n_en  )
   .log( "adj_en" , bn.adj_en )
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
