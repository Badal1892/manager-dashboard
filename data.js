export function fetchDashboardData(){
  return {
    navItems:["Dashboard","Tasks","Team","Reports"],

    stats:[
      {title:"Members",value:4},
      {title:"Tasks",value:5},
      {title:"Completed",value:20},
      {title:"Pending",value:3}
    ],

    teamMembers:[
      {name:"Rahul",role:"Dev",status:"Present"},
      {name:"Anjali",role:"Designer",status:"On Leave"},
      {name:"Aman",role:"Tester",status:"Present"},
      {name:"Priya",role:"HR",status:"On Leave"}
    ],

    recentActivity:["Task assigned","Meeting done"],

    activeTasks:[
      {name:"UI",deadline:"Today"},
      {name:"Backend",deadline:"Tomorrow"}
    ]
  };
}
