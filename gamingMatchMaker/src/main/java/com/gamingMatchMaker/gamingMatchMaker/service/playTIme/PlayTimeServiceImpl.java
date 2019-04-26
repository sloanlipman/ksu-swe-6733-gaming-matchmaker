package com.gamingMatchMaker.gamingMatchMaker.service.playTIme;

import com.gamingMatchMaker.gamingMatchMaker.dao.PlayTimeRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import com.gamingMatchMaker.gamingMatchMaker.model.PlayTime;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlayTimeServiceImpl implements PlayTimeService {
    private final PlayTimeRepository timeDao;

    public PlayTimeServiceImpl(PlayTimeRepository timeDao) {
        this.timeDao = timeDao;
    }

    @Override
    public List<String> getTimingNames() {
        List<String> names = new ArrayList<>();

        List<PlayTime> result = timeDao.findAll();

        for(PlayTime time: result)
            names.add(time.getTimingName());
        return names;

    }
}
