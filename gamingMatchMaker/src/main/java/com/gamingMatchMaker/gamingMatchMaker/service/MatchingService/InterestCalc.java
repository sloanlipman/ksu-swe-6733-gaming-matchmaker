package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import java.util.Set;

import org.springframework.stereotype.Component;

import com.gamingMatchMaker.gamingMatchMaker.model.Interest;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

@Component
public class InterestCalc implements IMatcher {

	/**
	 * Default Constructor
	 */
	public InterestCalc() {
		//empty in all regards
	}
	
	/**
	 * Scores a second user based on interests in common with the current user.
	 * @param self The principal user.
	 * @param other The other user to match interests with.
	 */
	@Override
	public int scoreUser(UserRec self, UserRec other) {
		int score = 0;
		Set<Interest> myints = self.getInterests();
		Set<Interest> theirints = other.getInterests();
		for(Interest i : myints) {
			if(theirints.contains(i)) score++;
		}
		//normalize vs 10
		if(score > 0) {
			score = Math.floorDiv(score, myints.size()) * 10;
			return (score > 0 ? score: 1);
		}
		else return 0;
	}

}
