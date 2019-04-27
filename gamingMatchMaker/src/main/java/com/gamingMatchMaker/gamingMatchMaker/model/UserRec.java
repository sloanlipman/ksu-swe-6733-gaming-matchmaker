package com.gamingMatchMaker.gamingMatchMaker.model;

import java.util.*;
import javax.persistence.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name="users")
public class UserRec {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "Int(11)")
    private int id;

    @Column(unique = true, nullable = false)
    private String email;
    private String first_name;
    private String last_name;
    private String password;
    private int age;
    private boolean is_active;
    private int user_type;

    @ManyToOne
    @JoinColumn(name="location_id", nullable = false)
    private Location location;

    /* Keeping this for historical perspective - but it looks like I need to do this another way
     */   
    //for the interests, join the interests table through the users_interests mapping 
    @ManyToMany(cascade = CascadeType.ALL) //save the interest with the user
    @JoinTable(
    	name = "users_interests",
    	joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "interest_id", referencedColumnName = "id")
    ) //map the interests table through the users_interests
    private final Set<Interest> interests;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
    	name = "priority_map",
    	joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "priority_id", referencedColumnName = "id")
    )
    @OrderColumn(name="the_order")
//    @OneToMany
//    @OrderBy("the_order")
    private final List<Priority> priorities;

    @ManyToMany
    private final Set<GameGenre> genres;

    @ManyToMany
    private final Set<PlayTime> timings;

    public UserRec() {
        this.interests = new HashSet<>();
        this.genres = new HashSet<>();
        this.timings = new HashSet<>();
		this.priorities = new ArrayList<>();
    }

    public UserRec(UserRec original) {
        this.id = original.id;
        this.email = original.email;
        this.first_name = original.first_name;
        this.last_name = original.last_name;
        this.password = original.password;
        this.age = original.age;
        this.is_active = original.is_active;
        this.user_type = original.user_type;
		this.priorities = new ArrayList<>(original.getPriorities());
        this.interests = new HashSet<>(original.getInterests());
        this.genres = new HashSet<>(original.getGenres());
        this.timings = new HashSet<>(original.getTimings());

        this.location = original.location;
    }

    public UserRec(String email, String first_name, String last_name,
                   String password, int age, boolean is_active,
                   int user_type, Location location) {
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.age = age;
        this.is_active = is_active;
        this.user_type = user_type;
        this.location = location;
        this.priorities = new ArrayList<>();
        this.interests = new HashSet<>();
        this.genres = new HashSet<>();
        this.timings = new HashSet<>();
    }

    //replace the above construct with a non-empty interests list
    public UserRec(String email, String first_name, String last_name,
                   String password, int age, boolean is_active,
                   int user_type, Location location,
                   Interest[] interests, GameGenre[] genres, PlayTime[] timings, Priority[] priorities
    ){
        this.email = email;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.age = age;
        this.is_active = is_active;
        this.user_type = user_type;
        this.location = location;
        this.priorities = new ArrayList<>(Arrays.asList(priorities));
        this.interests = new HashSet<>(Arrays.asList(interests));
        this.genres = new HashSet<>(Arrays.asList(genres));
        this.timings = new HashSet<>(Arrays.asList(timings));
    }

    /**
     * Add a new interest to the user.
     * @param I the interest to addI
     */
    public void AddInterest(Interest I) {
    	//TODO does this add new ones to the DB or must they already exist?
    	interests.add(I);
    }
    
    public void AddPriority(Priority p) {
    	//this should add in the same order they came in
    	//not the most robust but should do the trick
    	priorities.add(p);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRec userRec = (UserRec) o;
        return Objects.equals(email, userRec.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }

    public void setInterests(Set<Interest> interests) {
        this.interests.clear();
        this.interests.addAll(interests);
    }

    public void setGenres(Set<GameGenre> genres){
        this.genres.clear();
        this.genres.addAll(genres);
    }

    public void setTimings(Set<PlayTime> timings){
        this.timings.clear();
        this.timings.addAll(timings);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public void setUser_type(int user_type) {
        this.user_type = user_type;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<Interest> getInterests() {
        return interests;
    }

    public Set<GameGenre> getGenres() {
        return genres;
    }

    public Set<PlayTime> getTimings() {
        return timings;
    }
    
    /**
	 * @return the priorities
	 */
	public List<Priority> getPriorities() {
		return priorities;
	}

	/**
	 * @param priorities the priorities to set
	 */
	public void setPriorities(Set<Priority> priorities) {
		this.priorities.clear();
		this.priorities.addAll(priorities);
	}
}
