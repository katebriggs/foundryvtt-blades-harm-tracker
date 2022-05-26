Hooks.once('init', async function() {

});

Hooks.once('ready', async function() {

});

async function onUpdateActor(doc,changes,options,userId){
    console.log(changes);
}

Hooks.on('updateActor', onUpdateActor);