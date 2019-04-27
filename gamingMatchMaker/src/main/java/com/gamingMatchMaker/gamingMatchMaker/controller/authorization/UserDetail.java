package com.gamingMatchMaker.gamingMatchMaker.controller.authorization;

import java.util.ArrayList;

import com.gamingMatchMaker.gamingMatchMaker.model.*;

public class UserDetail {
    private int id;
    private String email;
    private String first_name;
    private String last_name;
    private int age;
    private boolean is_active;
    private int user_type;

    private final ArrayList<String> priorities;
    private final ArrayList<String> interests;
    private final ArrayList<String> genres;
    private final ArrayList<String> times;

    // TODO shouldn't the location have just the zip code - why are we sending
    // everything else to the front-end or otherwise expecting them to have it?
    private Location location;

    public UserDetail() {
        this.interests = new ArrayList<>();
        this.genres = new ArrayList<>();
        this.times = new ArrayList<>();
        this.priorities = new ArrayList<>();
    }

    public UserDetail(int id) {
        this.id = id;
        this.interests = new ArrayList<>();
        this.genres = new ArrayList<>();
        this.times = new ArrayList<>();
        this.priorities = new ArrayList<>();
    }

    public UserDetail(int id, String email, String first_name, String last_name,
                      int age, boolean is_active, int user_type, Location location
    ) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.is_active = is_active;
        this.user_type = user_type;
        this.location = location;
        this.interests = new ArrayList<>();
        this.genres = new ArrayList<>();
        this.times = new ArrayList<>();
        this.priorities = new ArrayList<>();
    }

    public UserDetail(int id, String email, String first_name, String last_name,
                      int age, boolean is_active, int user_type, ArrayList<String> interests,
                      ArrayList<String> genres, ArrayList<String> times, Location location, 
					  ArrayList<String> priorities
    ) {
        this.id = id;
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.age = age;
        this.is_active = is_active;
        this.user_type = user_type;
        this.location = location;
        this.priorities = new ArrayList<>(priorities);
        this.interests = new ArrayList<>(interests);
        this.genres = new ArrayList<>(genres);
        this.times = new ArrayList<>(times);
    }

    // need this for ProfileServiceImpl.SaveProfile() unit test
    /*
     * public UserDetail(int id, String email, String first_name, String last_name,
     * int age, boolean is_active, int user_type, Location location,
     * ArrayList<String> interests ) { this.id = id; this.email = email;
     * this.first_name = first_name; this.last_name = last_name; this.age = age;
     * this.is_active = is_active; this.user_type = user_type; this.location =
     * location; interests = new ArrayList<String>(); interests.addAll(interests); }
     */

    public UserDetail(UserRec orig) {
        this.id = orig.getId();
        this.email = orig.getEmail();
        this.first_name = orig.getFirst_name();
        this.last_name = orig.getLast_name();
        this.age = orig.getAge();
        this.is_active = orig.isIs_active();
        this.user_type = orig.getUser_type();
        this.location = orig.getLocation();

        this.interests = new ArrayList<>();
        this.genres = new ArrayList<>();
        this.times = new ArrayList<>();
        this.priorities = new ArrayList<>();

        for (Interest i : orig.getInterests()) {
            this.interests.add(i.getActivity());
        }
        for(GameGenre genre: orig.getGenres()){
            this.genres.add(genre.getGenreName());
        }
        
        for(Priority p : orig.getPriorities()) {
        	if(p != null) this.priorities.add(p.getName());
        }
        for(PlayTime time: orig.getTimings()){
            this.times.add(time.getTimingName());
        }

    }

    public UserDetail(UserDetail orig) {
        this.id = orig.getId();
        this.email = orig.getEmail();
        this.first_name = orig.getFirst_name();
        this.last_name = orig.getLast_name();
        this.age = orig.getAge();
        this.is_active = orig.isIs_active();
        this.user_type = orig.getUser_type();
        this.location = orig.getLocation();
        this.priorities = new ArrayList<>(orig.priorities);
        this.interests = new ArrayList<>(orig.interests);
        this.genres = new ArrayList<>(orig.genres);
        this.times = new ArrayList<>(orig.times);
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public boolean isIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public int getUser_type() {
        return user_type;
    }

    public Location getLocation() {
        return location;
    }

    public void setUser_type(int user_type) {
        this.user_type = user_type;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    /**
     */
    public void setInterests(ArrayList<String> interests) {
        this.interests.clear();
        this.interests.addAll(interests);
    }

    public void setGenres(ArrayList<String> genreName){
        this.genres.clear();
        genres.addAll(genreName);
    }
    /**
     * @return the interests
     */
    public ArrayList<String> getInterests() {
        return interests;
    }

    public ArrayList<String> getGenres() {
        return genres;
    }

	/**
	 * @return the priorities
	 */
	public ArrayList<String> getPriorities() {
		return priorities;
	}

	/**
	 * @param priorities the priorities to set
	 */
	public void setPriorities(ArrayList<String> priorities) {
		this.priorities.clear();
		this.priorities.addAll(priorities);
	}

    public ArrayList<String> getTimes() {
        return times;
    }

    public void setTimes(ArrayList<String> times) {
        this.times.clear();
        this.times.addAll(times);
    }
}

