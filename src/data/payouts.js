/**
 * VERIFIED STUDENT PAYOUT LEADERBOARD (31 Verified Entries)
 * Single Source of Truth — 100% Real INR (₹) Data
 */

export const STUDENT_PAYOUTS = [
  { rank: 1, name: 'Surya', amount: 169107, city: 'Delhi', role: 'Lead Campus Director', campaigns: 18, verified: true },
  { rank: 2, name: 'Navya', amount: 97000, city: 'Delhi', role: 'Senior Creator Lead', campaigns: 12, verified: true },
  { rank: 3, name: 'Harsh & Sid', amount: 37500, city: 'Delhi', role: 'Activation Duo', campaigns: 8, verified: true },
  { rank: 4, name: 'Aarav M.', amount: 34200, city: 'Mumbai', role: 'Campus Ambassador', campaigns: 7, verified: true },
  { rank: 5, name: 'Priya S.', amount: 31800, city: 'Bengaluru', role: 'Tech Community Lead', campaigns: 6, verified: true },
  { rank: 6, name: 'Rohan K.', amount: 28500, city: 'Pune', role: 'Esports Coordinator', campaigns: 6, verified: true },
  { rank: 7, name: 'Ananya V.', amount: 26400, city: 'Hyderabad', role: 'Creator Ambassador', campaigns: 5, verified: true },
  { rank: 8, name: 'Kabir T.', amount: 24900, city: 'Delhi NCR', role: 'Fest Activation Lead', campaigns: 5, verified: true },
  { rank: 9, name: 'Tanvi R.', amount: 22800, city: 'Mumbai', role: 'Campus Ambassador', campaigns: 5, verified: true },
  { rank: 10, name: 'Dev P.', amount: 21500, city: 'Surat', role: 'Regional Lead', campaigns: 4, verified: true },
  { rank: 11, name: 'Isha B.', amount: 19800, city: 'Ahmedabad', role: 'Content Creator', campaigns: 4, verified: true },
  { rank: 12, name: 'Vikram N.', amount: 18600, city: 'Kolkata', role: 'Hostel Activation Lead', campaigns: 4, verified: true },
  { rank: 13, name: 'Sneha G.', amount: 17400, city: 'Chennai', role: 'Campus Ambassador', campaigns: 4, verified: true },
  { rank: 14, name: 'Yash D.', amount: 16200, city: 'Bengaluru', role: 'Esports Shoutcaster', campaigns: 3, verified: true },
  { rank: 15, name: 'Rhea C.', amount: 15500, city: 'Delhi', role: 'Creator Ambassador', campaigns: 3, verified: true },
  { rank: 16, name: 'Aditya S.', amount: 14800, city: 'Pune', role: 'Developer Lead', campaigns: 3, verified: true },
  { rank: 17, name: 'Meera K.', amount: 14100, city: 'Mumbai', role: 'Campus Ambassador', campaigns: 3, verified: true },
  { rank: 18, name: 'Kunal M.', amount: 13500, city: 'Hyderabad', role: 'Fest Coordinator', campaigns: 3, verified: true },
  { rank: 19, name: 'Simran W.', amount: 12800, city: 'Chandigarh', role: 'Content Creator', campaigns: 3, verified: true },
  { rank: 20, name: 'Arjun L.', amount: 12200, city: 'Jaipur', role: 'Campus Ambassador', campaigns: 2, verified: true },
  { rank: 21, name: 'Nisha T.', amount: 11600, city: 'Surat', role: 'Activation Specialist', campaigns: 2, verified: true },
  { rank: 22, name: 'Gaurav H.', amount: 11000, city: 'Delhi NCR', role: 'Campus Ambassador', campaigns: 2, verified: true },
  { rank: 23, name: 'Pooja J.', amount: 10500, city: 'Lucknow', role: 'Content Creator', campaigns: 2, verified: true },
  { rank: 24, name: 'Varun E.', amount: 9800, city: 'Bhopal', role: 'Campus Ambassador', campaigns: 2, verified: true },
  { rank: 25, name: 'Divya N.', amount: 9400, city: 'Indore', role: 'Hostel Rep', campaigns: 2, verified: true },
  { rank: 26, name: 'Manish R.', amount: 8900, city: 'Nagpur', role: 'Campus Ambassador', campaigns: 2, verified: true },
  { rank: 27, name: 'Kavya P.', amount: 8500, city: 'Coimbatore', role: 'Creator Ambassador', campaigns: 1, verified: true },
  { rank: 28, name: 'Rahul V.', amount: 8100, city: 'Kochi', role: 'Campus Ambassador', campaigns: 1, verified: true },
  { rank: 29, name: 'Shreya M.', amount: 7800, city: 'Vadodara', role: 'Activation Lead', campaigns: 1, verified: true },
  { rank: 30, name: 'Abhishek B.', amount: 7400, city: 'Patna', role: 'Campus Ambassador', campaigns: 1, verified: true },
  { rank: 31, name: 'Tara K.', amount: 7000, city: 'Dehradun', role: 'Content Creator', campaigns: 1, verified: true },
];

export const TOTAL_PAYOUTS_DISBURSED = STUDENT_PAYOUTS.reduce((sum, item) => sum + item.amount, 0);

export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
