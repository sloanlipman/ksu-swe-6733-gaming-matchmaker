package com.gamingMatchMaker.gamingMatchMaker.service.gameGenre;

import com.gamingMatchMaker.gamingMatchMaker.dao.GameGenreRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameGenreServiceImpl implements GameGenreService {
    private final GameGenreRepository gameDao;

    public GameGenreServiceImpl(GameGenreRepository gameDao) {
        this.gameDao = gameDao;
    }

    @Override
    public List<GameGenre> getGenreName() {
        List<GameGenre> result = gameDao.findAll();

        return result;
    }
}
