
class HarmTracker{

    static ID = 'bitd-harm-tracker';
  
    // static FLAGS = {
    //   TODOS: 'todos'
    // }
    
    static TEMPLATES = {
      SVG: `modules/${this.ID}/templates/svg.hbs`
    }

    static HarmData(obj) {
        if('data' in obj && 'harm' in obj.data){
            return obj.data.harm;
        }
        return undefined;
    }

    static renderedIcons = [];

    static async refreshHarmTracker(playerList){

        HarmTracker.renderedIcons.forEach(ui => ui.remove());

        for(var listItem of playerList){
            var userId = listItem.getAttribute("data-user-id");
            var user = Users.instance.get(userId);
            if('data' in user && 'character' in user.data){
                
                if(!user.data.character) continue;
                const actor = ActorDirectory.collection.get(user.data.character);
                
                var uiparent = document.createElement("span");
                uiparent.setAttribute("class","harm-tracker-parent");
                uiparent.setAttribute("data-bound-actor",user.data.character);
                uiparent.addEventListener('click',HarmTracker.makeOnClickActorSheet(user.data.character));
                listItem.append(uiparent);
                
                var ui = await renderTemplate("modules/bitd-harm-tracker/templates/svg.hbs",actor.data.data.harm);
                ui = new Handlebars.SafeString(ui);
                uiparent.insertAdjacentHTML('beforeend',ui);
                
                HarmTracker.renderedIcons.push(uiparent);
            }
        }
    }

    static makeOnClickActorSheet(actorId){
        return function(){
            ActorDirectory.collection.get(actorId).sheet.render(true);
        }
    }

    static async onUpdateActor(doc,changes,options,userId){
        if(HarmTracker.HarmData(changes)){
            HarmTracker.refreshHarmTracker($("ol#player-list > li"));
        }
    }
    
    static async onRenderPlayerList(app,html,data){ 
        HarmTracker.refreshHarmTracker(html.find("ol#player-list > li"));
    }
}


Hooks.once('init', async function() {
    console.log(HarmTracker); 
});

Hooks.once('ready', async function() {

});

Hooks.on('updateActor', HarmTracker.onUpdateActor);
Hooks.on('renderPlayerList', HarmTracker.onRenderPlayerList);