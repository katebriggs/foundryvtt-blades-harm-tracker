
class HarmTracker{

    static HarmData(obj) {
        if('data' in obj && 'harm' in obj.data){
            return obj.data.harm;
        }
        return undefined;
    }

    static async onUpdateActor(doc,changes,options,userId){
        if(HarmData(changes)){
            console.log(HarmData(doc.data));
        }
    }
    static async onRenderPlayerList(app,html,data){
        for(var listItem of html.find("ol#player-list > li")){
            var button = document.createElement("button");
            button.style.flex = "flex";
            button.innerHTML = "Pog";
            listItem.append(button);            
        }
    }
}


Hooks.once('init', async function() {
    console.log("HELLO WORLD");
});

Hooks.once('ready', async function() {

});


Hooks.on('updateActor', HarmTracker.onUpdateActor);
Hooks.on('renderPlayerList', HarmTracker.onRenderPlayerList);