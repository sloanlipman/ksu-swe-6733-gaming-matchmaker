package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import org.springframework.stereotype.Component;

@Component
public class GenreCalc implements IMatcher {

	@Override
	public int scoreUser(UserRec self, UserRec other) {
		int score = 0;
		for(GameGenre gg : self.getGenres()) {
			if(other.getGenres().contains(gg)) score++;
		}
		//normalize vs 10
		if(score > 0) {
			score = Math.floorDiv(score, self.getGenres().size()) * 10;
			return (score > 0 ? score : 1);
		}
		else return 0;
		//return (Math.floorDiv(score, self.getGenres().size()) * 10);
	}

}
