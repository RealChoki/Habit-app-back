package de.htwberlin.webtech.Habitapp.model;

public class Habit {
    private Long id;
    private String type;
    private String frequency;
    private String title;
    private String description;
    private Boolean status;
    private Integer count;
    private Integer goal;
    private String subtype;
    private Integer timer;
    private Integer defaultTimer;

    // Constructor for "yesno" type
    public Habit(Long id, String type, String frequency, String title, String description, Boolean status) {
        this.id = id;
        this.type = type;
        this.frequency = frequency;
        this.title = title;
        this.description = description;
        this.status = status;
    }

    // Constructor for "numeric" type
    public Habit(Long id, String type, String frequency, String title, String description, String subtype, Integer count, Integer goal, Boolean status) {
        this.id = id;
        this.type = type;
        this.frequency = frequency;
        this.title = title;
        this.description = description;
        this.subtype = subtype;
        this.count = count;
        this.goal = goal;
        this.status = status;
    }

    // Constructor for "timer" type
    public Habit(Long id, String type, String frequency, String title, String description, Integer defaultTimer, Integer timer, Boolean status) {
        this.id = id;
        this.type = type;
        this.frequency = frequency;
        this.title = title;
        this.description = description;
        this.defaultTimer = defaultTimer;
        this.timer = timer;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getFrequency() { return frequency; }
    public void setFrequency(String frequency) { this.frequency = frequency; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Boolean getStatus() { return status; }
    public void setStatus(Boolean status) { this.status = status; }
    public Integer getCount() { return count; }
    public void setCount(Integer count) { this.count = count; }
    public Integer getGoal() { return goal; }
    public void setGoal(Integer goal) { this.goal = goal; }
    public String getSubtype() { return subtype; }
    public void setSubtype(String subtype) { this.subtype = subtype; }
    public Integer getTimer() { return timer; }
    public void setTimer(Integer timer) { this.timer = timer; }
    public Integer getDefaultTimer() { return defaultTimer; }
    public void setDefaultTimer(Integer defaultTimer) { this.defaultTimer = defaultTimer; }
}
