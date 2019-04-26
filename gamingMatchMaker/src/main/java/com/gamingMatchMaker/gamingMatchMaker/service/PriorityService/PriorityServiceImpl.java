package com.gamingMatchMaker.gamingMatchMaker.service.PriorityService;

import com.gamingMatchMaker.gamingMatchMaker.dao.PrioritiesRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Priority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PriorityServiceImpl implements PriorityService {
    private final PrioritiesRepository prioritiesDao;

    public PriorityServiceImpl(PrioritiesRepository prioritiesDao) {
        this.prioritiesDao = prioritiesDao;
    }

    @Override
    public List<String> getAllPriorities() {
        List<String> names = new ArrayList<>();

        List<Priority> result = prioritiesDao.findAll();

        for(Priority priority: result)
            names.add(priority.getName());
        return names;

    }
}
