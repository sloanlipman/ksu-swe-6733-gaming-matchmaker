<<<<<<< Upstream, based on origin/master
package com.gamingMatchMaker.gamingMatchMaker.dao;

import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LocationRepository extends JpaRepository<Location, UUID> {
}
=======
package com.gamingMatchMaker.gamingMatchMaker.dao;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;

public interface LocationRepository extends JpaRepository<Location, UUID> {
 
}
>>>>>>> 40876ae Adding Attribution info
