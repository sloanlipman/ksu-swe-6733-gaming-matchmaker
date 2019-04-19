package com.gamingMatchMaker.gamingMatchMaker.service.ProfileService;

import com.gamingMatchMaker.gamingMatchMaker.dao.GameGenreRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.GameGenre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import com.gamingMatchMaker.gamingMatchMaker.controller.SaveChangesAttempt;
import com.gamingMatchMaker.gamingMatchMaker.dao.InterestRepository;
import com.gamingMatchMaker.gamingMatchMaker.dao.LocationRepository;
import com.gamingMatchMaker.gamingMatchMaker.dao.UserRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Interest;
import com.gamingMatchMaker.gamingMatchMaker.model.Location;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;

@Service
public class ProfileServiceImpl implements ProfileService {

	private UserRepository phoneBook;
	private LocationRepository atlas;
	private InterestRepository hobbyLobby;
	private	GameGenreRepository genreDao;
	
	@Autowired
	public ProfileServiceImpl(
			UserRepository ur, 
			LocationRepository lr, 
			InterestRepository ir,
			GameGenreRepository genreDao) {
		this.phoneBook = ur;
		this.atlas = lr;
		this.hobbyLobby = ir;
		this.genreDao = genreDao;
	}
	
	/**
	 * Reads the user's profile.
	 * @param id The user id for the information to retrieve.
	 * @throws UserException The user was not found.
	 */
	@Override
	public UserRec GetUserProfile(int id) throws UserException {
		Optional<UserRec> rec = phoneBook.findById(id);
		if(rec.isPresent()) return rec.get();
		else throw new UserException("No user found");
	}

	/**
	 * @param scr The wrapper for both the changes to saved and any error messsages.
	 */
	@Override
	public boolean SaveProfile(SaveChangesAttempt scr) {
		//fetch the object to update
		Optional<UserRec> rec = phoneBook.findById(scr.getUd().getId());
	
		//if we can't find the user write the error message and quit
		if(!rec.isPresent()) {
			scr.setMessage("User does not exist.  Please Register first.");
			return false;
		}
		
		//verify the location is present before saving anything
		Optional<Location> spot = atlas.findByZip(scr.getUd().getLocation().getZip());
		if(!spot.isPresent()) {
			scr.setMessage("Zipcode does not exist.");
			return false;
		}

		//there's got to be a better way to do this, but screw it - GO GO BRUTE FORCE
		rec.get().setAge(scr.getUd().getAge());  //TODO validate age
		rec.get().setEmail(scr.getUd().getEmail()); //TODO validate email
		rec.get().setFirst_name(scr.getUd().getFirst_name());
		rec.get().setIs_active(scr.getUd().isIs_active());
		rec.get().setLast_name(scr.getUd().getLast_name());
		rec.get().setLocation(spot.get());

		//ok, interests gets a little more interesting (<rimshot>)
		for(String s : scr.getUd().getInterests()) {

			//try to get the interest
			Optional<Interest> I = hobbyLobby.findByActivity(s);
			
			if(I.isPresent()) {
				//the interest exists, just tack it onto the list
				rec.get().AddInterest(I.get());
			}
			else {
				//not present, we need to add the interest first
				Interest hobby = hobbyLobby.save(new Interest(s));
				rec.get().AddInterest(hobby);
			}
		}
//		 for(String g : scr.getUd().getGenres()){
//		 	Optional<GameGenre> genres = genreDao.findByGenreName(g);
//		 }
//
		//save the record
		phoneBook.save(rec.get()); //TODO do I need this?
		
		//if we've gotten here everything worked!
		return true;
	}

}
