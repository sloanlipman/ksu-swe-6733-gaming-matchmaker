package com.gamingMatchMaker.gamingMatchMaker.controller.gameGenre;

import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;

import java.util.List;

public class GetGameGenreNameResponse {
    private List<GameGenre> gameGenresId;

    public GetGameGenreNameResponse() {
    }

    public GetGameGenreNameResponse(List<GameGenre> gameGenresName) {
        this.gameGenresId = gameGenresName;
    }

    public List<GameGenre> getGameGenresName() {
        return gameGenresId;
    }

    public void setGameGenresName(List<GameGenre> gameGenresName) {
        this.gameGenresId = gameGenresName;
    }
}
