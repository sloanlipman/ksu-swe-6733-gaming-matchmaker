package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;

import java.util.UUID;

public interface LocationRepository extends JpaRepository<Location, UUID> {
	Optional<Location> findByZip(int zipCode);
}
