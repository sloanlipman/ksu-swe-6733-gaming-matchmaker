package com.gamingMatchMaker.gamingMatchMaker.service.gameGenre;

import com.gamingMatchMaker.gamingMatchMaker.dao.GameGenreRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameGenreServiceImpl implements GameGenreService {
    private final GameGenreRepository genreDao;

    public GameGenreServiceImpl(GameGenreRepository gameDao) {
        this.genreDao = gameDao;
    }

    @Override
    public List<String> getGenreNames() {
        List<String> names = new ArrayList<>();

        List<GameGenre> result = genreDao.findAll();

        for(GameGenre gameGenre: result)
            names.add(gameGenre.getGenreName());

        return names;
    }
}
