package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gamingMatchMaker.gamingMatchMaker.model.Priority;


public interface PrioritiesRepository extends JpaRepository<Priority, UUID>  {
	Optional<Priority> findByName(String name);
}
