package com.gamingMatchMaker.gamingMatchMaker.Steam.GSON;

public class PlayerStats {
	public String gameName;
	public String steamID;
	public PlayerAch[] achievements;
	public PlayerStat[] stats;
	
<<<<<<< HEAD
	//GSON contructor 
=======
	//GSON contructor
>>>>>>> Initial files, and tweak to gitignore to not grab eclipse project file.
	public PlayerStats() {
		//do nothing
	}
	
	public int GetAchievementCount() {
		if(achievements != null) return achievements.length;
		else return 0;
	}
}
