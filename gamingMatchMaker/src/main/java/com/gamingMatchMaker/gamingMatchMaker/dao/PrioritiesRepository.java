package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gamingMatchMaker.gamingMatchMaker.model.Priority;


public interface PrioritiesRepository extends JpaRepository<Priority, Integer>  {
//	Optional<Priority> findByPriorityName(String name);
	List<Priority> findByPriorityNameIn(List<String> priorityNames);

}
