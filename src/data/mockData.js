export const USERS = [
  {
    id: 'user_jonah',
    name: 'Jonah Brown',
    role: 'owner',
    title: 'Founder & Owner',
    initials: 'JB',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '(734) 260-4999',
    email: 'jonah@chelseapc.com',
    specialty: 'Master Builder & Business Lead'
  },
  {
    id: 'user_marcus',
    name: 'Marcus Vance',
    role: 'project_manager',
    title: 'Senior Project Manager',
    initials: 'MV',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '(734) 555-0142',
    email: 'marcus@chelseapc.com',
    specialty: 'Site Management & Client Relations'
  },
  {
    id: 'user_dave',
    name: 'Dave Miller',
    role: 'worker',
    title: 'Lead Painter',
    initials: 'DM',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '(734) 555-0188',
    email: 'dave@chelseapc.com',
    specialty: 'Fine Spray Finishes & Historic Exteriors'
  },
  {
    id: 'user_carlos',
    name: 'Carlos Ortiz',
    role: 'worker',
    title: 'Lead Finish Carpenter',
    initials: 'CO',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '(734) 555-0199',
    email: 'carlos@chelseapc.com',
    specialty: 'Coffered Ceilings, Crown & Custom Millwork'
  },
  {
    id: 'user_sarah',
    name: 'Sarah Jenkins',
    role: 'worker',
    title: 'Paint & Color Specialist',
    initials: 'SJ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '(734) 555-0211',
    email: 'sarah@chelseapc.com',
    specialty: 'Interior Architectural Coatings & Color Match'
  },
  {
    id: 'user_leo',
    name: 'Leo Chen',
    role: 'worker',
    title: 'Apprentice Carpenter',
    initials: 'LC',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    phone: '(734) 555-0233',
    email: 'leo@chelseapc.com',
    specialty: 'Framing, Demolition & Trim Assist'
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj_washtenaw',
    name: 'Washtenaw Historic Exterior Restoration',
    customer: 'Eleanor & Robert Vance',
    customerPhone: '(734) 913-8820',
    customerEmail: 'eleanor.vance@umich.edu',
    address: '1420 Cambridge Rd, Ann Arbor, MI 48104',
    jobType: 'Painting',
    status: 'In Progress',
    progress: 68,
    estimatedBudget: 18500,
    actualCost: 12450,
    laborCost: 8100,
    materialCost: 4350,
    startDate: '2026-10-06',
    deadline: '2026-11-14',
    assignedTeam: ['user_dave', 'user_sarah', 'user_carlos'],
    scope: 'Complete exterior historical restoration. Power scrape, hand sand lead-safe surfaces, replace rotted architectural brackets on south eaves, two coats of Sherwin-Williams Emerald Exterior in custom period palette.',
    description: '1910 Craftsman 2.5-story home in Burns Park/Ann Arbor. Requires meticulous prep work, glazing repairs on 18 divided-lite windows, and copper gutter protection.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'proj_barton',
    name: 'Barton Hills Custom Kitchen & Coffered Ceilings',
    customer: 'Dr. Aris & Claire Thorne',
    customerPhone: '(734) 662-7940',
    customerEmail: 'athorne@med.umich.edu',
    address: '895 Underdown Rd, Barton Hills, MI 48105',
    jobType: 'Remodeling',
    status: 'In Progress',
    progress: 45,
    estimatedBudget: 42000,
    actualCost: 21350,
    laborCost: 13500,
    materialCost: 7850,
    startDate: '2026-09-28',
    deadline: '2026-12-05',
    assignedTeam: ['user_carlos', 'user_leo', 'user_marcus'],
    scope: 'Custom architectural woodwork, two-piece crown molding, 9-box coffered ceiling in great room, maple island cabinetry fabrication, lacquer finish on all trim.',
    description: 'High-end residential interior renovation. Architectural plans by Studio M Architects. Tight tolerances required for ceiling grids.',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'proj_dexter',
    name: 'Dexter Riverfront Estate Interior Repaint',
    customer: 'Mark & Chloe Davenport',
    customerPhone: '(734) 426-3190',
    customerEmail: 'cdavenport@davenportlaw.com',
    address: '3110 Huron River Dr, Dexter, MI 48130',
    jobType: 'Painting',
    status: 'Scheduled',
    progress: 10,
    estimatedBudget: 14200,
    actualCost: 1400,
    laborCost: 800,
    materialCost: 600,
    startDate: '2026-10-24',
    deadline: '2026-11-20',
    assignedTeam: ['user_dave', 'user_sarah'],
    scope: 'Interior wall, ceiling, and trim repaint for 4,200 sq ft modern home. High foyer walls requiring rolling scaffolding, Benjamin Moore Scuff-X in high traffic areas.',
    description: 'Pre-move-in refresh. Owners requested non-VOC paints throughout. Color consultation completed and confirmed.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'proj_oldwest',
    name: 'Old West Side Porch Rebuild & Victorian Millwork',
    customer: 'Miriam Goldstein',
    customerPhone: '(734) 761-9034',
    customerEmail: 'mgoldstein@umich.edu',
    address: '412 W Jefferson St, Ann Arbor, MI 48103',
    jobType: 'Carpentry',
    status: 'In Progress',
    progress: 88,
    estimatedBudget: 16800,
    actualCost: 15200,
    laborCost: 10400,
    materialCost: 4800,
    startDate: '2026-09-18',
    deadline: '2026-10-25',
    assignedTeam: ['user_carlos', 'user_leo', 'user_dave'],
    scope: 'Structural rebuild of front porch decking with clear vertical grain Douglas Fir, turned spindle balustrade reproduction, decorative brackets and solid color stain finish.',
    description: 'Historic preservation district compliance approved. Final punch list items and deck coating remaining.',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'proj_saline',
    name: 'Saline Farmhouse Modern Mudroom & Trim',
    customer: 'Kevin & Andrea Miller',
    customerPhone: '(734) 944-1182',
    customerEmail: 'kmiller@salinefarms.net',
    address: '7420 Saline-Ann Arbor Rd, Saline, MI 48176',
    jobType: 'Remodeling',
    status: 'Completed',
    progress: 100,
    estimatedBudget: 22500,
    actualCost: 21800,
    laborCost: 14200,
    materialCost: 7600,
    startDate: '2026-08-10',
    deadline: '2026-09-30',
    assignedTeam: ['user_carlos', 'user_dave', 'user_sarah'],
    scope: 'Built-in mudroom cubbies with white oak bench seats, nickel gap shiplap, brass hardware, custom sliding double barn doors with soft-close mechanisms.',
    description: 'Completed on schedule. Client gave a 5-star review and referred two neighbors.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'proj_burnspark',
    name: 'Burns Park Craftsman Staircase & Wainscoting',
    customer: 'Julian & Sophie Ward',
    customerPhone: '(734) 668-4512',
    customerEmail: 'jward@warddesign.com',
    address: '1502 Morton Ave, Ann Arbor, MI 48104',
    jobType: 'Carpentry',
    status: 'Estimate',
    progress: 0,
    estimatedBudget: 9800,
    actualCost: 0,
    laborCost: 0,
    materialCost: 0,
    startDate: '2026-11-08',
    deadline: '2026-11-26',
    assignedTeam: ['user_carlos'],
    scope: 'Restore original 1922 quarter-sawn white oak staircase treads, fabricate recessed-panel wainscoting along main entryway, matching existing period baseboards.',
    description: 'Detailed proposal submitted to client on Oct 14. Pending final contract signature.',
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_TASKS = [
  {
    id: 'task_1',
    projectId: 'proj_washtenaw',
    title: 'Final topcoat on south dormer & gingerbread trim',
    description: 'Apply 2nd coat Sherwin-Williams Emerald Gloss in "Roycroft Brass" accent trim on south peaks.',
    assignedTo: 'user_dave',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-10-20',
    isOverdue: false,
    photos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c_1',
        author: 'Jonah Brown',
        authorRole: 'Owner',
        text: 'Make sure the flashing around that dormer valley is thoroughly wiped down before paint.',
        timestamp: 'Today at 7:45 AM',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        id: 'c_2',
        author: 'Dave Miller',
        authorRole: 'Lead Painter',
        text: 'Checked and clean. Primer bonded great yesterday. Will be finished with south gable by 2 PM.',
        timestamp: 'Today at 8:15 AM',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    issueReported: null
  },
  {
    id: 'task_2',
    projectId: 'proj_washtenaw',
    title: 'Replace rotted sill plate on east carriage doors',
    description: 'Sill has wood rot under the exterior jamb. Cut out decayed cedar section and Dutchman in new treated stock.',
    assignedTo: 'user_carlos',
    priority: 'High',
    status: 'To Do',
    dueDate: '2026-10-18', // OVERDUE
    isOverdue: true,
    photos: [],
    comments: [
      {
        id: 'c_3',
        author: 'Marcus Vance',
        authorRole: 'PM',
        text: 'This was delayed because we needed client approval on the change order. Approved now, please prioritize.',
        timestamp: 'Yesterday at 3:10 PM',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      }
    ],
    issueReported: {
      text: 'Found minor termite trace in adjacent subfloor. Stabilized with borate; Marcus notified.',
      reportedBy: 'Carlos Ortiz',
      timestamp: 'Oct 19, 9:20 AM'
    }
  },
  {
    id: 'task_3',
    projectId: 'proj_barton',
    title: 'Assemble & level coffered ceiling perimeter beam grid',
    description: 'Laser level ceiling framing, secure 2x6 blocking into joists, dry-fit maple box beams.',
    assignedTo: 'user_carlos',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-10-21',
    isOverdue: false,
    photos: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c_4',
        author: 'Leo Chen',
        authorRole: 'Apprentice Carpenter',
        text: 'Pre-cut the intersecting halving joints in the shop. Ready for installation.',
        timestamp: 'Yesterday at 4:30 PM',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
      }
    ],
    issueReported: null
  },
  {
    id: 'task_4',
    projectId: 'proj_barton',
    title: 'Prep kitchen island base for satin white lacquer',
    description: 'Fill all nail holes with Aqua Coat pore filler, block sand to 220 grit, tack cloth clean.',
    assignedTo: 'user_leo',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '2026-10-22',
    isOverdue: false,
    photos: [],
    comments: [],
    issueReported: null
  },
  {
    id: 'task_5',
    projectId: 'proj_washtenaw',
    title: 'Mask all storm windows and copper roof valleys',
    description: 'Use 3M 2090 blue painter tape and builder paper. Protect landscaping with canvas tarps.',
    assignedTo: 'user_sarah',
    priority: 'Medium',
    status: 'Completed',
    dueDate: '2026-10-15',
    isOverdue: false,
    photos: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=80'
    ],
    comments: [
      {
        id: 'c_5',
        author: 'Sarah Jenkins',
        authorRole: 'Paint Specialist',
        text: 'All copper flashing securely covered. Homeowner was very pleased with the garden protection.',
        timestamp: 'Oct 15, 2:10 PM',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    ],
    issueReported: null
  },
  {
    id: 'task_6',
    projectId: 'proj_oldwest',
    title: 'Install turned balusters on Victorian front porch',
    description: 'Space balusters exactly 3.8 inches on center per Ann Arbor code, secure with stainless screws and dowel plugs.',
    assignedTo: 'user_carlos',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-10-17',
    isOverdue: false,
    photos: [],
    comments: [],
    issueReported: null
  },
  {
    id: 'task_7',
    projectId: 'proj_oldwest',
    title: 'Apply 2 coats of porch & floor enamel to decking',
    description: 'Sherwin-Williams Porch & Floor enamel in "Downing Slate". Sand lightly between coats.',
    assignedTo: 'user_dave',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-10-20',
    isOverdue: false,
    photos: [],
    comments: [
      {
        id: 'c_6',
        author: 'Dave Miller',
        authorRole: 'Lead Painter',
        text: 'Coat 1 down this morning. Weather is 64°F and clear, drying nicely.',
        timestamp: 'Today at 10:15 AM',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    issueReported: null
  },
  {
    id: 'task_8',
    projectId: 'proj_dexter',
    title: 'Site setup & color swatch test panels in master bedroom',
    description: 'Apply 3 large 2x2 test swatches of Repose Gray, Agreeable Gray, and Modern Gray under natural light.',
    assignedTo: 'user_sarah',
    priority: 'Low',
    status: 'To Do',
    dueDate: '2026-10-24',
    isOverdue: false,
    photos: [],
    comments: [],
    issueReported: null
  },
  {
    id: 'task_9',
    projectId: 'proj_dexter',
    title: 'Order Benjamin Moore Scuff-X paint & consumables',
    description: 'Confirm 18 gallons Matte Eggshell, 6 gallons Advance Satin for trim, 4 boxes 3M masking tape.',
    assignedTo: 'user_marcus',
    priority: 'High',
    status: 'To Do',
    dueDate: '2026-10-19', // OVERDUE
    isOverdue: true,
    photos: [],
    comments: [
      {
        id: 'c_7',
        author: 'Jonah Brown',
        authorRole: 'Owner',
        text: 'Marcus, use the Chelsea Lumber corporate account to get our 15% contractor discount.',
        timestamp: 'Oct 19, 8:00 AM',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      }
    ],
    issueReported: null
  }
];

export const INITIAL_CHANGE_ORDERS = [
  {
    id: 'co_101',
    projectId: 'proj_washtenaw',
    title: 'East Carriage House Fascia & Rotted Crown Replacement',
    description: 'Uncovered 24 linear feet of severely rotted fascia and 2 architectural dentil molding blocks behind gutters on the east carriage house elevation during power scraping.',
    laborCost: 950,
    materialCost: 520,
    totalPrice: 1470,
    requestedDate: '2026-10-17',
    requestedBy: 'Carlos Ortiz',
    status: 'Pending',
    attachments: ['decay_inspection_01.jpg', 'dentil_block_specs.pdf']
  },
  {
    id: 'co_102',
    projectId: 'proj_barton',
    title: 'Upgrade to Hand-Selected Walnut Inlay on Ceiling Beams',
    description: 'Homeowner requested changing center coffered beam reveals from painted maple to live-edge American Black Walnut with satin tung oil finish.',
    laborCost: 1200,
    materialCost: 1650,
    totalPrice: 2850,
    requestedDate: '2026-10-14',
    requestedBy: 'Marcus Vance',
    status: 'Approved',
    approvedDate: '2026-10-16',
    attachments: ['walnut_lumber_spec.pdf']
  },
  {
    id: 'co_103',
    projectId: 'proj_oldwest',
    title: 'Add Hidden Low-Voltage Step Riser Lighting',
    description: 'Install 4 flush-mounted warm LED bronze deck lights into front porch steps connected to smart transformer in basement.',
    laborCost: 480,
    materialCost: 340,
    totalPrice: 820,
    requestedDate: '2026-10-12',
    requestedBy: 'Miriam Goldstein (Client)',
    status: 'Approved',
    approvedDate: '2026-10-13',
    attachments: ['kichler_lighting_cutsheet.pdf']
  },
  {
    id: 'co_104',
    projectId: 'proj_barton',
    title: 'Custom Wine Rack Cabinet Inserts in Island',
    description: 'Add integrated 16-bottle horizontal wine storage unit with dovetail joinery into the kitchen island end-cap.',
    laborCost: 650,
    materialCost: 420,
    totalPrice: 1070,
    requestedDate: '2026-10-19',
    requestedBy: 'Claire Thorne (Client)',
    status: 'Pending',
    attachments: ['cabinet_wine_sketch.png']
  }
];

export const INITIAL_PHOTOS = [
  {
    id: 'p_1',
    projectId: 'proj_washtenaw',
    category: 'Before',
    title: 'Peeling paint on south gable & weather-beaten corbels',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    uploader: 'Dave Miller',
    timestamp: '2026-10-06 08:30 AM',
    areaRef: 'South Elevation / Attic Gables'
  },
  {
    id: 'p_2',
    projectId: 'proj_washtenaw',
    category: 'During',
    title: 'Hand scraping & epoxy wood consolidation on brackets',
    url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    uploader: 'Dave Miller',
    timestamp: '2026-10-14 02:15 PM',
    areaRef: 'Main Porch Eaves'
  },
  {
    id: 'p_3',
    projectId: 'proj_washtenaw',
    category: 'During',
    title: 'First coat Sherwin-Williams Emerald gloss applied',
    url: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80',
    uploader: 'Sarah Jenkins',
    timestamp: '2026-10-18 11:45 AM',
    areaRef: 'West Front Portico'
  },
  {
    id: 'p_4',
    projectId: 'proj_barton',
    category: 'Before',
    title: 'Bare ceiling drywall prior to framing layout',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=80',
    uploader: 'Carlos Ortiz',
    timestamp: '2026-09-29 09:00 AM',
    areaRef: 'Great Room Ceiling'
  },
  {
    id: 'p_5',
    projectId: 'proj_barton',
    category: 'During',
    title: 'Coffered beam grid joist blocking & laser leveling',
    url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop&q=80',
    uploader: 'Leo Chen',
    timestamp: '2026-10-17 03:20 PM',
    areaRef: 'Ceiling Grid 3x3'
  },
  {
    id: 'p_6',
    projectId: 'proj_oldwest',
    category: 'After',
    title: 'Completed Victorian balustrade with primed Douglas fir',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=800&auto=format&fit=crop&q=80',
    uploader: 'Carlos Ortiz',
    timestamp: '2026-10-18 04:30 PM',
    areaRef: 'Front Entry Porch'
  },
  {
    id: 'p_7',
    projectId: 'proj_saline',
    category: 'After',
    title: 'Completed white oak mudroom lockers and shiplap',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    uploader: 'Jonah Brown',
    timestamp: '2026-09-30 05:00 PM',
    areaRef: 'Main Mudroom'
  }
];

export const INITIAL_DAILY_REPORTS = [
  {
    id: 'rep_1',
    projectId: 'proj_washtenaw',
    date: '2026-10-19',
    author: 'Dave Miller',
    authorRole: 'Lead Painter',
    hoursWorked: 8.5,
    workersPresent: ['Dave Miller', 'Sarah Jenkins'],
    workCompleted: 'Finished priming all east and north eaves with peel-bonding primer. Sanded door casings and patched minor stucco cracks around dining room bay.',
    materialsUsed: '2 gals SW Exterior Primer, 1 tube Quad Max sealant, 1 pack 150-grit sanding sponges.',
    issuesEncountered: 'Found rotted carriage house fascia board (submitted change order CO #101). East gutters need cleaning before fascia repair.',
    notes: 'Homeowner Mrs. Vance checked in at noon and was delighted with the prep cleanliness.'
  },
  {
    id: 'rep_2',
    projectId: 'proj_barton',
    date: '2026-10-19',
    author: 'Carlos Ortiz',
    authorRole: 'Lead Finish Carpenter',
    hoursWorked: 8.0,
    workersPresent: ['Carlos Ortiz', 'Leo Chen'],
    workCompleted: 'Installed perimeter ledger for coffered beams. Fastened ceiling backing blocks with 3.5" structural GRK screws. Checked all 12 downlight rough-in locations with electrician.',
    materialsUsed: '8 pcs 2x6x12 SPF framing lumber, 1 box GRK structural screws, 2 tubes subfloor adhesive.',
    issuesEncountered: 'Electrician needed to shift 2 recessed cans by 3 inches to clear central beam intersection.',
    notes: 'Laser grid dead level within 1/16th over 28-foot span.'
  },
  {
    id: 'rep_3',
    projectId: 'proj_washtenaw',
    date: '2026-10-18',
    author: 'Sarah Jenkins',
    authorRole: 'Paint Specialist',
    hoursWorked: 7.5,
    workersPresent: ['Dave Miller', 'Sarah Jenkins'],
    workCompleted: 'Completed masking on 14 divided-lite sash windows. Scraped blistered paint on western balustrades.',
    materialsUsed: '3 rolls 3M 2090 blue tape, 2 rolls poly sheeting.',
    issuesEncountered: 'None.',
    notes: 'All sash weights verified working freely.'
  }
];

export const INITIAL_SCHEDULE = [
  {
    id: 'sch_1',
    projectId: 'proj_washtenaw',
    projectName: 'Washtenaw Historic Exterior',
    title: 'Topcoat Spray & Gingerbread Trim Brushing',
    date: '2026-10-20', // TODAY
    timeWindow: '8:00 AM – 4:00 PM',
    siteAddress: '1420 Cambridge Rd, Ann Arbor',
    assignedWorkers: ['user_dave', 'user_sarah'],
    status: 'In Progress',
    type: 'Finishing'
  },
  {
    id: 'sch_2',
    projectId: 'proj_barton',
    projectName: 'Barton Hills Kitchen & Coffered Ceilings',
    title: 'Coffered Grid Framing & Beam Fitment',
    date: '2026-10-20', // TODAY
    timeWindow: '8:30 AM – 4:30 PM',
    siteAddress: '895 Underdown Rd, Barton Hills',
    assignedWorkers: ['user_carlos', 'user_leo'],
    status: 'In Progress',
    type: 'Installation'
  },
  {
    id: 'sch_3',
    projectId: 'proj_oldwest',
    projectName: 'Old West Side Porch Rebuild',
    title: 'Porch Floor Final Enamel Coat & Clean Up',
    date: '2026-10-20', // TODAY
    timeWindow: '1:00 PM – 5:00 PM',
    siteAddress: '412 W Jefferson St, Ann Arbor',
    assignedWorkers: ['user_dave'],
    status: 'Scheduled',
    type: 'Finishing'
  },
  {
    id: 'sch_4',
    projectId: 'proj_burnspark',
    projectName: 'Burns Park Craftsman Staircase',
    title: 'Client Estimate Consultation & On-Site Measure',
    date: '2026-10-21',
    timeWindow: '10:00 AM – 11:30 AM',
    siteAddress: '1502 Morton Ave, Ann Arbor',
    assignedWorkers: ['user_jonah', 'user_marcus'],
    status: 'Scheduled',
    type: 'Consultation'
  },
  {
    id: 'sch_5',
    projectId: 'proj_washtenaw',
    projectName: 'Washtenaw Historic Exterior',
    title: 'Sill Plate Dutchman Wood Repair',
    date: '2026-10-21',
    timeWindow: '8:00 AM – 2:00 PM',
    siteAddress: '1420 Cambridge Rd, Ann Arbor',
    assignedWorkers: ['user_carlos'],
    status: 'Scheduled',
    type: 'Site Visit'
  },
  {
    id: 'sch_6',
    projectId: 'proj_dexter',
    projectName: 'Dexter Riverfront Estate',
    title: 'Interior Walkthrough & Color Swatch Review',
    date: '2026-10-24',
    timeWindow: '9:00 AM – 12:00 PM',
    siteAddress: '3110 Huron River Dr, Dexter',
    assignedWorkers: ['user_marcus', 'user_sarah'],
    status: 'Scheduled',
    type: 'Site Visit'
  },
  {
    id: 'sch_7',
    projectId: 'proj_barton',
    projectName: 'Barton Hills Kitchen & Coffered Ceilings',
    title: 'Crown Molding Installation on Perimeter Beams',
    date: '2026-10-27',
    timeWindow: '8:00 AM – 4:30 PM',
    siteAddress: '895 Underdown Rd, Barton Hills',
    assignedWorkers: ['user_carlos', 'user_leo'],
    status: 'Scheduled',
    type: 'Installation'
  }
];

export const INITIAL_DOCUMENTS = [
  {
    id: 'doc_1',
    projectId: 'proj_washtenaw',
    name: 'Washtenaw_Estimate_Scope_Rev3.pdf',
    category: 'Estimates and Proposals',
    size: '1.4 MB',
    uploadDate: '2026-10-02',
    uploader: 'Jonah Brown',
    restrictedTo: ['owner', 'project_manager'],
    type: 'pdf'
  },
  {
    id: 'doc_2',
    projectId: 'proj_washtenaw',
    name: 'Vance_Signed_Prime_Contract.pdf',
    category: 'Contracts',
    size: '2.8 MB',
    uploadDate: '2026-10-04',
    uploader: 'Jonah Brown',
    restrictedTo: ['owner', 'project_manager'],
    type: 'pdf'
  },
  {
    id: 'doc_3',
    projectId: 'proj_washtenaw',
    name: 'Sherwin_Williams_Historic_Palette_Specs.pdf',
    category: 'Paint Colors and Material Selections',
    size: '4.1 MB',
    uploadDate: '2026-10-06',
    uploader: 'Sarah Jenkins',
    restrictedTo: null,
    type: 'pdf'
  },
  {
    id: 'doc_4',
    projectId: 'proj_washtenaw',
    name: 'Ann_Arbor_Historic_District_Permit_Approved.pdf',
    category: 'Permits and Warranty Documents',
    size: '890 KB',
    uploadDate: '2026-10-05',
    uploader: 'Marcus Vance',
    restrictedTo: null,
    type: 'pdf'
  },
  {
    id: 'doc_5',
    projectId: 'proj_barton',
    name: 'Architectural_Ceiling_Grid_Plans_RevB.dwg.pdf',
    category: 'Plans and Specifications',
    size: '6.2 MB',
    uploadDate: '2026-09-27',
    uploader: 'Marcus Vance',
    restrictedTo: null,
    type: 'pdf'
  },
  {
    id: 'doc_6',
    projectId: 'proj_barton',
    name: 'Chelsea_Lumber_Invoice_Maple_Hardwoods.pdf',
    category: 'Invoices and Receipts',
    size: '420 KB',
    uploadDate: '2026-10-12',
    uploader: 'Carlos Ortiz',
    restrictedTo: ['owner', 'project_manager'],
    type: 'pdf'
  },
  {
    id: 'doc_7',
    projectId: 'proj_oldwest',
    name: 'Old_West_Side_Building_Permit_Card.pdf',
    category: 'Permits and Warranty Documents',
    size: '750 KB',
    uploadDate: '2026-09-17',
    uploader: 'Marcus Vance',
    restrictedTo: null,
    type: 'pdf'
  }
];

export const INITIAL_EXPENSES = [
  {
    id: 'exp_1',
    projectId: 'proj_washtenaw',
    category: 'Paint & Primers',
    description: '10 Gals Sherwin-Williams Emerald Gloss & Exterior Primer',
    amount: 865.00,
    date: '2026-10-08',
    recordedBy: 'Dave Miller'
  },
  {
    id: 'exp_2',
    projectId: 'proj_washtenaw',
    category: 'Lumber & Trim',
    description: 'Clear Cedar 1x6 stock for dental molding bracket repair',
    amount: 340.50,
    date: '2026-10-12',
    recordedBy: 'Carlos Ortiz'
  },
  {
    id: 'exp_3',
    projectId: 'proj_washtenaw',
    category: 'Equipment & Rentals',
    description: 'Bil-Jax 3-stage rolling scaffold rental (1 week)',
    amount: 420.00,
    date: '2026-10-09',
    recordedBy: 'Marcus Vance'
  },
  {
    id: 'exp_4',
    projectId: 'proj_barton',
    category: 'Lumber & Trim',
    description: '4/4 Select White Maple Boards for coffered beams',
    amount: 2450.00,
    date: '2026-10-04',
    recordedBy: 'Carlos Ortiz'
  },
  {
    id: 'exp_5',
    projectId: 'proj_barton',
    category: 'Hardware & Fasteners',
    description: 'GRK structural framing screws and subfloor polyurethane adhesive',
    amount: 185.20,
    date: '2026-10-11',
    recordedBy: 'Leo Chen'
  },
  {
    id: 'exp_6',
    projectId: 'proj_oldwest',
    category: 'Lumber & Trim',
    description: 'Douglas Fir 1x4 T&G Porch Flooring (Ann Arbor Woodworks)',
    amount: 1840.00,
    date: '2026-09-22',
    recordedBy: 'Carlos Ortiz'
  }
];

export const INITIAL_MESSAGES = [
  {
    id: 'conv_washtenaw',
    type: 'project',
    projectId: 'proj_washtenaw',
    name: 'Washtenaw Historic Crew',
    avatar: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&auto=format&fit=crop&q=80',
    unreadCount: 1,
    messages: [
      {
        id: 'm_1',
        senderId: 'user_jonah',
        senderName: 'Jonah Brown',
        text: 'Morning team! Let’s make sure we tarp the hydrangeas carefully on the south side today.',
        timestamp: '8:05 AM',
        date: '2026-10-20'
      },
      {
        id: 'm_2',
        senderId: 'user_dave',
        senderName: 'Dave Miller',
        text: 'All set Jonah. Canvas drop cloths deployed and secured with spring clamps.',
        timestamp: '8:20 AM',
        date: '2026-10-20'
      },
      {
        id: 'm_3',
        senderId: 'user_sarah',
        senderName: 'Sarah Jenkins',
        text: 'Just finished the 2nd sash coat on the dining bay. Color match to 1910 swatch is spot on!',
        timestamp: '11:15 AM',
        date: '2026-10-20',
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80'
      }
    ]
  },
  {
    id: 'conv_barton',
    type: 'project',
    projectId: 'proj_barton',
    name: 'Barton Hills Remodel Crew',
    avatar: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=150&auto=format&fit=crop&q=80',
    unreadCount: 0,
    messages: [
      {
        id: 'm_4',
        senderId: 'user_carlos',
        senderName: 'Carlos Ortiz',
        text: 'Ceiling grid perimeter is framed and level. Electrician just wrapped up box offsets.',
        timestamp: 'Yesterday at 3:45 PM',
        date: '2026-10-19'
      },
      {
        id: 'm_5',
        senderId: 'user_marcus',
        senderName: 'Marcus Vance',
        text: 'Great work Carlos. The walnut accent change order was approved by Dr. Thorne this morning.',
        timestamp: 'Yesterday at 4:10 PM',
        date: '2026-10-19'
      }
    ]
  },
  {
    id: 'conv_dm_marcus',
    type: 'direct',
    userId: 'user_marcus',
    name: 'Marcus Vance',
    title: 'Senior Project Manager',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    unreadCount: 1,
    messages: [
      {
        id: 'm_6',
        senderId: 'user_marcus',
        senderName: 'Marcus Vance',
        text: 'Hey Jonah, I reviewed Carlos’s change order for the Washtenaw carriage house. Price is fair at $1,470.',
        timestamp: '9:30 AM',
        date: '2026-10-20'
      }
    ]
  },
  {
    id: 'conv_dm_dave',
    type: 'direct',
    userId: 'user_dave',
    name: 'Dave Miller',
    title: 'Lead Painter',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    unreadCount: 0,
    messages: [
      {
        id: 'm_7',
        senderId: 'user_dave',
        senderName: 'Dave Miller',
        text: 'Need 2 more sleeves of 4-inch microfiber mini rollers for the porch enamel.',
        timestamp: 'Yesterday at 1:15 PM',
        date: '2026-10-19'
      },
      {
        id: 'm_8',
        senderId: 'user_jonah',
        senderName: 'Jonah Brown',
        text: 'I left a box in the back of van #3 this morning, grab what you need.',
        timestamp: 'Yesterday at 1:25 PM',
        date: '2026-10-19'
      }
    ]
  },
  {
    id: 'conv_dm_carlos',
    type: 'direct',
    userId: 'user_carlos',
    name: 'Carlos Ortiz',
    title: 'Lead Finish Carpenter',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    unreadCount: 0,
    messages: [
      {
        id: 'm_9',
        senderId: 'user_carlos',
        senderName: 'Carlos Ortiz',
        text: 'Balusters on Miriam’s porch are completely done and solid as a rock.',
        timestamp: 'Oct 18, 5:12 PM',
        date: '2026-10-18'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif_1',
    title: 'Pending Change Order Requires Approval',
    description: 'CO #101: Carriage House Fascia & Rotted Crown ($1,470) on Washtenaw Historic.',
    timestamp: '25 min ago',
    type: 'approval',
    read: false,
    targetTab: 'projects',
    targetProjectId: 'proj_washtenaw',
    targetSection: 'changeOrders'
  },
  {
    id: 'notif_2',
    title: 'Overdue Task Alert',
    description: 'Replace rotted sill plate on east carriage doors was due Oct 18.',
    timestamp: '1 hour ago',
    type: 'task',
    read: false,
    targetTab: 'tasks',
    targetTaskId: 'task_2'
  },
  {
    id: 'notif_3',
    title: 'New Site Photo Uploaded',
    description: 'Sarah Jenkins uploaded sash paint match photo to Washtenaw Historic.',
    timestamp: '2 hours ago',
    type: 'photo',
    read: true,
    targetTab: 'projects',
    targetProjectId: 'proj_washtenaw',
    targetSection: 'photos'
  },
  {
    id: 'notif_4',
    title: 'Daily Report Submitted',
    description: 'Carlos Ortiz submitted Barton Hills report (8.0 hrs worked, ceiling grid framed).',
    timestamp: 'Yesterday',
    type: 'report',
    read: true,
    targetTab: 'projects',
    targetProjectId: 'proj_barton',
    targetSection: 'updates'
  },
  {
    id: 'notif_5',
    title: 'Direct Message from Marcus Vance',
    description: 'Hey Jonah, I reviewed Carlos’s change order for the Washtenaw carriage house.',
    timestamp: 'Today at 9:30 AM',
    type: 'message',
    read: false,
    targetTab: 'messages',
    targetConvId: 'conv_dm_marcus'
  }
];
