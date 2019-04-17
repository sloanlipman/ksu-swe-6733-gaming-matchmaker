package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.gamingMatchMaker.gamingMatchMaker.dao.UserRepository;
import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;
import com.gamingMatchMaker.gamingMatchMaker.service.authService.UserException;

import java.util.ArrayList;
import java.util.HashMap;

public class MatchingServiceImpl implements MatchingService {

	private HashMap<Integer, IMatcher> matchers;	//ordered list
	private HashMap<String, IMatcher> plugins;		//keyed look-up of known 
	private UserRepository phoneBook;
	
	/**
	 * Default Constructor
	 */
	@Autowired
	public MatchingServiceImpl(UserRepository ur) {
		matchers = new HashMap<>();
		plugins = new HashMap<>();
		this.phoneBook = ur;
	}
	
	/**
	 * Change the priorities - the order in which the plugins are run.
	 * @param prs The new list of priorities.
	 * @throws PluginException
	 */
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
		matchers = ms;
	}
	
	/**
	 * Get the list of Users who meet the matching criteria, according the currently set priorities.
	 * @param uid The Id of the user to match other players to.
	 * @return A list of matched players.
	 * @exception UserException The user to match could not be found.
	 */
	public List<UserRec> getMatches(Integer uid) throws UserException {
		//inti the return value
		ArrayList<UserRec> recs = new ArrayList<>();
		
		//get the user asking for matches
		Optional<UserRec> self = phoneBook.findById(uid);
		//throw an exception if 
		if(!self.isPresent()) throw new UserException("User not found.");
		
		//fill in recs and remove the user
		recs.addAll(phoneBook.findAll());
		recs.remove(self.get());
			//little nervous not checking the return value, but if it's not found the findById above failed first
		
		//go through the plugins, highest priority firt
		for(int i = 0; i < matchers.size(); i++) {
			recs = matchers.get(i).findMatches(self.get(), recs);
		}
		
		//return the matches list
		return recs;
	}
	
	/**
	 * Add a new plugin to the list.
	 * @param name The name of the plugin.
	 * @param im The object which does the matching.
	 * @throws PluginException If the plugin already exists.  In this case the new plugin isn't added.
	 */
	public void registerPlugin(String name, IMatcher im) throws PluginException {
		if(plugins.containsKey(name)) 
			throw new PluginException("Plugin " + name + " already exists." );
		else plugins.put(name,  im);
	}
	
	/**
	 * Read the list of available matching plugins.
	 * @return The list of plugins.
	 */
	public List<String> getAllPlugins() {
		ArrayList<String> plugs = new ArrayList<>();
		plugs.addAll(plugins.keySet());
		return plugs;
	}
	
}
