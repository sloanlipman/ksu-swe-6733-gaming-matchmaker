package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Interest;

public interface InterestRepository extends JpaRepository<Interest, UUID> {

}
