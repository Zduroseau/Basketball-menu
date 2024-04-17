class Player {
    constructor(name, position, height, weight, Age) {
        this.name = name;
        this.weight= weight;
        this.position = position;
        this.height = height;
        this.Age = Age;
    }

}

Player.prototype.describe= function(){
    return `Player Name: ${this.name}
            Position: ${this.position}
            Height: ${this.height}
            Weight: ${this.weight}
            Age: ${this.Age}`;
};

class PlayerManager {
constructor() {
    this.players = [];
}

addPlayer(player) {
    this.players.push(player);
}

removePlayer(player) {
    const index = this.players.indexOf(player);
    if (index !== -1) {
        this.players.splice(index, 1);
    }
}

getPlayerByName(name) {
    return this.players.find(player => player.name === name);
}

getPlayerByPosition(position) {
    return this.players.filter(player => player.position === position);
}

getAllPlayers() {
    return this.players;
}
}





class Team {
    constructor(name){
        this.name=name
        this.players=[];
    }

    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player)
        } else {
            throw new Error(`Invalid Argument: You can only add a Player, ${player}`)
        }
    }
    describe() {
        return `${this.name} has ${this.players.length} Players.`
    }
}






class Menu {
 constructor() {
    this.teams = []
    this.selectedteam = null
 }

start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0){
        switch(selection){
            case `1`:
                this.createTeam();
                break;
            case `2`:
                this.viewTeam();
                break
            case `3`:
                this.deleteTeam();
                break
            case `4`:
                this.displayTeams();
                break 
            default:
                selection = 0
             }
             selection = this.showMainMenuOptions()
        }
      alert(`Farewell!`)  
    }

showMainMenuOptions(){
    return prompt(`
    0) exit
    1) create new team
    2) view team
    3) delete team
    4) display all teams
    `);
}

showTeamMenuOptions(teamInfo) {
    return prompt(`
    0)back
    1)create player
    2)delete player
    -----------------------
    ${teamInfo}
    `);
}



deleteTeam() {
    let index = parseInt(prompt(`Enter the Index of the team you want to delete`));
    if (index > -1 && index < this.teams.length) {
        let deletedTeamName = this.teams[index].name;
        this.teams.splice(index, 1);
        alert(`${deletedTeamName} has been deleted.`);
    } else {
        alert(`Invalid Team`);
    }
}




displayTeams() {
    let teamString = ``;
    for (let i=0; i< this.teams.length; i++) {
        teamString += i +`)`+ this.teams[i].name + `\n`;
    }
    alert(teamString);

    let index = parseInt(prompt(`Enter the index of the team you'd like to select`));
    if (index > -1 && index < this.teams.length) {
        return this.teams[index];
    } else {
        alert("Invalid team")
    }

}

createTeam() {
    let name = prompt(`Enter name for new team`)
    this.teams.push(new Team(name));
}

viewTeam() {
    let index = parseInt(prompt(`Enter the index of the team you wish to view`));
    if (index > -1 && index < this.teams.length) {
        this.selectedteam = this.teams[index];
        let description = `Team Name: `
+this.selectedteam.name + `\n`;

        for (let i=0; i<this.selectedteam.players.length; i++) {
            description += i + `)` + this.selectedteam.players[i].name + `-` + this.selectedteam.players[i].position + `\n`;
        }

        let selection = this.showTeamMenuOptions(description);
        switch (selection) {
            case `1`:
                this.createPlayer();
                break;
            case `2`: 
                this.deletePlayer();
        }
        
if (this.selectedteam.players.length > 0) {
} else {
    alert("This team has no players.");
}
}
}

createPlayer(team) {
    let playerName = prompt(`Enter Player Name:`);
    if (playerName === null || playerName.trim() === "") {
        alert('Player Name cannot be left empty. Player not added.');
        return; 
    } 
    let playerPosition = prompt(`Enter Player Position:`);
    let playerHeight = prompt(`Enter Player Height:`);
    let playerWeight = prompt(`Enter Player Weight:`);
    let playerAge = prompt(`Enter Player age:`);

    let newPlayer = new Player(playerName, playerPosition, playerHeight, playerWeight, playerAge);

    team.addPlayer(newPlayer);

    alert(`${playerName} has been added to team ${team.name}`);

    if (team.players.length === 0) {
        alert("This team has no players.");
    }
}


}


let menu = new Menu();
menu.start();
