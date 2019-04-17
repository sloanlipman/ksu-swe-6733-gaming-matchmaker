package com.gamingMatchMaker.gamingMatchMaker.controller.gameGenre;

import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;

import java.util.List;

public class GetGameGenreNameResponse {
    private List<GameGenre> gameGenresName;

    public GetGameGenreNameResponse() {
    }

    public GetGameGenreNameResponse(List<GameGenre> gameGenresName) {
        this.gameGenresName = gameGenresName;
    }

    public List<GameGenre> getGameGenresName() {
        return gameGenresName;
    }

    public void setGameGenresName(List<GameGenre> gameGenresName) {
        this.gameGenresName = gameGenresName;
    }
}
