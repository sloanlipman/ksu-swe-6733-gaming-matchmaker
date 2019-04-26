package com.gamingMatchMaker.gamingMatchMaker.dao;

import com.gamingMatchMaker.gamingMatchMaker.model.PlayTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PlayTimeRepository extends JpaRepository<PlayTime, Integer> {
    List<PlayTime> findByTimingNameIn(List<String> timingNames);
}
