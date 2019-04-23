package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Interest;

public interface InterestRepository extends JpaRepository<Interest, UUID> {
	Optional<Interest> findByActivity(String activity);
	List<Interest> findByUsers_Id(int userId);
	List<Interest> findByActivityIn(List<String> activityList);
}
