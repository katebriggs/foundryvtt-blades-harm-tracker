
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

    static async onUpdateActor(doc,changes,options,userId){
        if(HarmData(changes)){
            console.log(HarmData(doc.data));
        }
    }
    
    static async onRenderPlayerList(app,html,data){
        for(var listItem of html.find("ol#player-list > li")){
            var userId = listItem.getAttribute("data-user-id");
            var user = Users.instance.get(userId);
            if('data' in user && 'character' in user.data){
                if(!user.data.character) continue;
                const actor = ActorDirectory.collection.get(user.data.character);
                
                var ui = await renderTemplate(this.TEMPLATES.SVG,actor.data.data.harm);
                ui = new Handlebars.SafeString(ui);
                listItem.insertAdjacentHTML('beforeend',ui);
            }
        }
    }
}


Hooks.once('init', async function() {
    console.log(HarmTracker); 
});

Hooks.once('ready', async function() {

});


Hooks.on('updateActor', HarmTracker.onUpdateActor);
Hooks.on('renderPlayerList', HarmTracker.onRenderPlayerList);