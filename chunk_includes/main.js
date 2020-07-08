PennController.ResetPrefix(null); // Initiates PennController

Sequence( "intro1", "intro2", randomize("familiarization") , "send" , "final" )

// Start typing your code here
newTrial("intro1",
    defaultText
        .print()
    ,
    newText("<p>Welcome!</p>")
    ,
    newText("<p>In this experiment, you will have to describe pictures in different ways.</p>")
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

newTrial("intro2",
    defaultText
        .print()
    ,
    newText("<p>First, we'll familiarize you with the pictures.</p>")
        .print()
    ,
    newText("<p>We'll show you each picture along with the name you should use for it.</p>")
        .print()
        ,
    newButton("Start")
        .print()
        .wait()

)

Template("material_selection.csv",
    variable =>
    newTrial("familiarization",

    newImage("picture", variable.picture_file)
    .size(variable.picture_size, variable.picture_size)
    .print()
    ,
    newTimer("trial_time", 500)
    .start()
    .wait()
    ,
    newText(variable.n_lemma_en)
    .center()
    .settings.css("font-size", "2em")
    .print()
    ,
    newTimer("trial_time", 1000)
    .start()
    .wait()
    )
   .log( "sub_id"     , getVar("ID")    )
   .log( "n_lemma"   , variable.n_lemma_de   )
   .log( "adj_lemma" , variable.adj_lemma_de )
);


Template(variable =>
    newTrial("bare_noun",
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
    newImage("picture", variable.picture_file)
    .size(variable.picture_size, variable.picture_size)
    .print()
    ,
    newTimer("trial_time", 3000)
    .start()
    .wait()
    ,
    getImage("picture")
    .remove()
    ,
    newText(variable.continue_de)
    .css("border", "solid 200px white")
    .print()
    ,
    newKey("space", " ")
    .wait()
    )
   .log( "sub_id"     , getVar("ID")    )
   .log( "n_lemma"   , variable.n_lemma_de   )
   .log( "adj_lemma" , variable.adj_lemma_de )
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
