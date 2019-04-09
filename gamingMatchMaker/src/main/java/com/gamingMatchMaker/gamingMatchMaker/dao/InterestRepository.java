package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Interest;

public interface InterestRepository extends JpaRepository<Interest, UUID> {
	Optional<Interest> findByActivity(String activity);
}
