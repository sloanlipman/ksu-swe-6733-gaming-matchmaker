package com.gamingMatchMaker.gamingMatchMaker.Steam.GSON;

public class PlayerAch {
	public String name;
	public int achieved;
	
	//GSON contructor 
	public PlayerAch() {
		//do nothign?
	}

	public boolean Achieved() {
		return achieved > 0;
	}
	
}
