package com.gamingMatchMaker.gamingMatchMaker.service.userService;

import com.gamingMatchMaker.gamingMatchMaker.controller.authorization.UserDetail;
import com.gamingMatchMaker.gamingMatchMaker.dao.*;
import com.gamingMatchMaker.gamingMatchMaker.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userDao;
    private final LocationRepository locDao;
    private final InterestRepository interestDao;
    private final GameGenreRepository genreDao;
    private final PlayTimeRepository timeDao;
    private final PrioritiesRepository priorityDao;

    @Autowired
    public UserServiceImpl(UserRepository userDao, LocationRepository locDao,
                           InterestRepository interestDao, GameGenreRepository genreDao,
                           PlayTimeRepository timeDao, PrioritiesRepository priorityDao

    ) {
        this.userDao = userDao;
        this.locDao = locDao;
        this.interestDao = interestDao;
        this.genreDao = genreDao;
        this.timeDao = timeDao;
        this.priorityDao = priorityDao;
}

    @Override
    public Optional<UserRec> update(UserDetail userDetail) {
        // Step one make sure userDetail is not null
        if(userDetail == null) {
            throw new RuntimeException("userDetail was null.");
        }

        // Step two find the actual user rec we want to update
        Optional<UserRec> actualUserRecOpt = userDao.findById(userDetail.getId());

        // if we can't find the user write the error message and quit
        if(!actualUserRecOpt.isPresent()) {
            throw new RuntimeException("User does not exist.  Please Register first.");
        }

        // Step 3 verify the location zipcode represents a valid location
        if(userDetail.getLocation() == null) {
            throw new RuntimeException("Location was null.");
        }
        Optional<Location> actualNewLocOpt = locDao.findByZip(userDetail.getLocation().getZip());
        if(!actualNewLocOpt.isPresent()) {
            throw new RuntimeException("Could not find Location for " + userDetail.getLocation().getZip() + ".");
        }

        // Step 4 now grab the actual UserRec from the optional
        UserRec userRec = actualUserRecOpt.get();

        // Step 5 update the values we want to change
        userRec.setAge(userDetail.getAge());  //TODO validate age
        userRec.setEmail(userDetail.getEmail()); //TODO validate email
        userRec.setFirst_name(userDetail.getFirst_name());
        userRec.setIs_active(userDetail.isIs_active());
        userRec.setLast_name(userDetail.getLast_name());
        userRec.setLocation(actualNewLocOpt.get());

        // Step 7 update the list of interests for this user
        // first load the list of genres from the genre names
        List<Interest> newInterestList = this.interestDao.findByActivityIn(userDetail.getInterests());
        userRec.setInterests(new HashSet<>(newInterestList));

        // Step 7 update the list of genres for this user
        // first load the list of genres from the genre names
        List<GameGenre> newGenreList = this.genreDao.findByGenreNameIn(userDetail.getGenres());
        userRec.setGenres(new HashSet<>(newGenreList));

        // Step 8 update the list of playTiming for the playtime names
        List<PlayTime> newTimeList =  this.timeDao.findByTimingNameIn(userDetail.getTimes());
        userRec.setTimings(new HashSet<>(newTimeList));

        List<Priority> newPriorityList = this.priorityDao.findByPriorityNameIn(userDetail.getPriorities());
        userRec.setPriorities(new HashSet<>(newPriorityList));

        // Finally save and return the updated record
        return Optional.of(userDao.save(userRec));
    }
}
