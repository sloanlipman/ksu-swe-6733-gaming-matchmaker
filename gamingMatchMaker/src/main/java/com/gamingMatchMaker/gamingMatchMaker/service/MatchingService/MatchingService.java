package com.gamingMatchMaker.gamingMatchMaker.service.MatchingService;

import java.util.List;
import java.util.Set;

import com.gamingMatchMaker.gamingMatchMaker.model.UserRec;

public interface MatchingService {
	void setPriorities(List<String> prs) throws PluginException;
	List<UserRec> getMatches(Integer uid);
	void registerPlugin(String name, IMatcher im) throws PluginException;
	List<String> getAllPlugins();
}
