package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.gamingMatchMaker.gamingMatchMaker.dao.PrioritiesRepository;
import com.gamingMatchMaker.gamingMatchMaker.dao.UserRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.Priority;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
@Service
public class MatchingServiceImpl implements MatchingService {

	//private HashMap<Integer, IMatcher> matchers;	//ordered list
	private final  HashMap<String, IMatcher> plugins;		//keyed look-up of known
	private final  UserRepository phoneBook;
	private final PrioritiesRepository plugRepo;
	
	/**
	 * Default Constructor
	 */
	@Autowired
	public MatchingServiceImpl(UserRepository ur, PrioritiesRepository pr) {
//		matchers = new HashMap<>();
		plugins = new HashMap<>();
		this.phoneBook = ur;
		this.plugRepo = pr;
	}
	
	/**
	 * Change the priorities - the order in which the plugins are run.  THIS SHOULD NEVER BE USED!!
	 * @param prs The new list of priorities.
	 * @throws PluginException
	 */
	@Override
	public void setPriorities(List<String> prs) throws PluginException {
		//create a new matchers set to load
		HashMap<Integer, IMatcher> ms = new HashMap<>();
		
		//loop by keys for ease of sync'ing the two 
		for(int i = 0; i < prs.size(); i++) {
			//if the plugin exists place it
			if(plugins.containsKey(prs.get(i))) ms.put(i, plugins.get(prs.get(i)));
			//else error and quit
			else throw new PluginException("Match-making Plugin " + prs.get(i) + " does not exist." );
		}
		
		//now load the matchers - this way there is no change on the matchers when we error
//		matchers = ms;
	}
	
	/**
	 * Get the list of Users who meet the matching criteria, according the currently set priorities.
	 * @param uid The Id of the user to match other players to.
	 * @return A list of matched players.
	 * @exception UserException The user to match could not be found.
	 */
	@Override
	public List<UserRec> getMatches(Integer uid) throws UserException {
		//get the score holder ready
		LinkedHashMap<UserRec, Integer> scores = new LinkedHashMap<>();
		
		//inti the return value
		ArrayList<UserRec> users = new ArrayList<>();
		
		//get the user asking for matches
		Optional<UserRec> self = phoneBook.findById(uid);
		//throw an exception if 
		if(!self.isPresent()) throw new UserException("User not found.");
		
		//fill in recs and remove the user
		users.addAll(phoneBook.findAll());
		users.remove(self.get());
			//little nervous not checking the return value, but if it's not found the findById above failed first
		
		//run on a per user basis
		for(UserRec ur : users) {
			//if the user id isn't in the list add it
			if(!scores.containsKey(ur)) scores.put(ur, 0);
			List<Priority> matchers = self.get().getPriorities();
			
			//go through the plugins, highest priority firt
			for(int i = 0; i < self.get().getPriorities().size(); i++) {
				
				//calculate the score for this matcher - use the index for weighting
				int score = plugins.get(matchers.get(i).getName()).scoreUser(self.get(), ur) * (i); //so the earlier ones will have higher values
							//could I have been anymore convoluted?
				
				//update the score for this other user
				scores.computeIfPresent(ur, (k,v) -> v + score);
			}
		}
		
		//sort the scores
		scores = scores
			.entrySet()
			.stream()
			.sorted((Map.Entry.<UserRec, Integer>comparingByValue().reversed()))
			.collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
		//ooh eeh ooh ah aah ting tang walla walla bingbang! - voodoo
		
		//make the final list holder
		ArrayList<UserRec> recs = new ArrayList<>();
		
		//copy the keys over
		for(UserRec ur : scores.keySet()) recs.add(ur);
		
		//return the matches list
		return recs;
	}
	
	/**
	 * Add a new plugin to the list.
	 * @param name The name of the plugin.
	 * @param im The object which does the matching.
	 * @throws PluginException If the plugin already exists.  In this case the new plugin isn't added.
	 */
	@Override
	public void registerPlugin(String name, IMatcher im) throws PluginException {
		if(plugins.containsKey(name)) 
			throw new PluginException("Plugin " + name + " already exists." );
		else plugins.put(name,  im);
	}
	
	/**
	 * Read the list of available matching plugins.
	 * @return The list of plugins.
	 */
	@Override
	public List<String> getAllPlugins() {
		ArrayList<String> plugs = new ArrayList<>();
		for(Priority p : plugRepo.findAll()) {
			plugs.add(p.getName());
		}
		return plugs;
	}
	
}
