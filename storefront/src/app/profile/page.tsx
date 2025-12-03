"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, ShoppingBag, Edit2, Save, Camera, Loader2, LogOut, MapPin, Phone, Calendar, Home, Building2, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { createClient } from '@/utils/supabase/client';

// Indian States list
const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

// Major cities by state
const CITIES_BY_STATE: { [key: string]: string[] } = {
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Meerut", "Allahabad", "Ghaziabad", "Noida", "Bareilly", "Aligarh", "Moradabad", "Gorakhpur", "Firozabad", "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Farrukhabad", "Ayodhya"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Navi Mumbai", "Sangli", "Malegaon", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Ichalkaranji"],
    "Delhi": ["New Delhi", "Delhi", "Dwarka", "Rohini", "Saket", "Pitampura", "Janakpuri", "Lajpat Nagar", "Karol Bagh", "Connaught Place"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Bellary", "Shimoga", "Tumkur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Vellore", "Erode", "Thoothukkudi"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Anand", "Nadiad"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer", "Bhilwara", "Alwar", "Sikar", "Bharatpur"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet"],
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Rajahmundry", "Kakinada", "Kadapa", "Anantapur"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram"],
    "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Hoshiarpur", "Batala", "Moga"],
    "Haryana": ["Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat", "Panchkula"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
    "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh", "Deoghar", "Giridih", "Ramgarh", "Phusro", "Medininagar"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Raigarh", "Jagdalpur", "Ambikapur", "Chirmiri"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Bongaigaon", "Dhubri", "Diphu"],
    "Chandigarh": ["Chandigarh"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Pithoragarh", "Ramnagar", "Mussoorie"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Solan", "Mandi", "Palampur", "Baddi", "Nahan", "Paonta Sahib", "Sundernagar", "Kullu"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Sanquelim", "Cuncolim", "Quepem"],
    "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Sopore", "Kathua", "Udhampur", "Punch", "Rajouri", "Kupwara"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Belonia", "Khowai", "Ambassa", "Sabroom", "Sonamura", "Amarpur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Baghmara", "Resubelpara", "Ampati", "Mairang", "Nongpoh"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul", "Senapati", "Tamenglong", "Jiribam", "Kakching", "Moirang"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib", "Lawngtlai", "Saiha", "Mamit", "Khawzawl", "Saitual"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Along", "Tezu", "Namsai", "Roing"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek", "Kiphire", "Longleng"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Rangpo", "Singtam", "Jorethang", "Nayabazar", "Ravangla", "Pelling"],
    "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Rangat", "Mayabunder", "Car Nicobar", "Nancowry", "Campbell Bay"],
    "Ladakh": ["Leh", "Kargil", "Diskit", "Padum", "Nyoma", "Tangtse"],
    "Lakshadweep": ["Kavaratti", "Agatti", "Minicoy", "Amini", "Andrott", "Kalpeni"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Amli", "Naroli"]
};

// Comprehensive Pincode to City/State mapping (Local - No API)
const fetchCityState = async (pincode: string): Promise<{ city: string; state: string } | null> => {
    // Pincode prefix mapping (first 3 digits to city/state)
    const pincodeData: { [key: string]: { city: string; state: string } } = {
        // Delhi (110xxx)
        "110": { city: "Delhi", state: "Delhi" },
        
        // Haryana
        "121": { city: "Faridabad", state: "Haryana" },
        "122": { city: "Gurgaon", state: "Haryana" },
        "123": { city: "Rewari", state: "Haryana" },
        "124": { city: "Rohtak", state: "Haryana" },
        "125": { city: "Hisar", state: "Haryana" },
        "126": { city: "Jind", state: "Haryana" },
        "127": { city: "Bhiwani", state: "Haryana" },
        "128": { city: "Narnaul", state: "Haryana" },
        "129": { city: "Sonipat", state: "Haryana" },
        "130": { city: "Panipat", state: "Haryana" },
        "131": { city: "Panipat", state: "Haryana" },
        "132": { city: "Karnal", state: "Haryana" },
        "133": { city: "Ambala", state: "Haryana" },
        "134": { city: "Panchkula", state: "Haryana" },
        "135": { city: "Yamunanagar", state: "Haryana" },
        "136": { city: "Kurukshetra", state: "Haryana" },
        
        // Punjab
        "140": { city: "Ropar", state: "Punjab" },
        "141": { city: "Ludhiana", state: "Punjab" },
        "142": { city: "Moga", state: "Punjab" },
        "143": { city: "Amritsar", state: "Punjab" },
        "144": { city: "Jalandhar", state: "Punjab" },
        "145": { city: "Hoshiarpur", state: "Punjab" },
        "146": { city: "Sangrur", state: "Punjab" },
        "147": { city: "Patiala", state: "Punjab" },
        "148": { city: "Barnala", state: "Punjab" },
        "150": { city: "Mohali", state: "Punjab" },
        "151": { city: "Bathinda", state: "Punjab" },
        "152": { city: "Muktsar", state: "Punjab" },
        
        // Chandigarh
        "160": { city: "Chandigarh", state: "Chandigarh" },
        
        // Himachal Pradesh
        "171": { city: "Shimla", state: "Himachal Pradesh" },
        "172": { city: "Solan", state: "Himachal Pradesh" },
        "173": { city: "Bilaspur", state: "Himachal Pradesh" },
        "174": { city: "Una", state: "Himachal Pradesh" },
        "175": { city: "Mandi", state: "Himachal Pradesh" },
        "176": { city: "Kangra", state: "Himachal Pradesh" },
        "177": { city: "Hamirpur", state: "Himachal Pradesh" },
        
        // J&K
        "180": { city: "Jammu", state: "Jammu and Kashmir" },
        "181": { city: "Kathua", state: "Jammu and Kashmir" },
        "182": { city: "Udhampur", state: "Jammu and Kashmir" },
        "184": { city: "Poonch", state: "Jammu and Kashmir" },
        "190": { city: "Srinagar", state: "Jammu and Kashmir" },
        "191": { city: "Srinagar", state: "Jammu and Kashmir" },
        "192": { city: "Anantnag", state: "Jammu and Kashmir" },
        "193": { city: "Baramulla", state: "Jammu and Kashmir" },
        "194": { city: "Leh", state: "Ladakh" },
        
        // Uttar Pradesh - NCR
        "201": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "203": { city: "Bulandshahr", state: "Uttar Pradesh" },
        
        // Greater Noida specific (201xxx)
        "202": { city: "Aligarh", state: "Uttar Pradesh" },
        "204": { city: "Hathras", state: "Uttar Pradesh" },
        "205": { city: "Etah", state: "Uttar Pradesh" },
        "206": { city: "Etawah", state: "Uttar Pradesh" },
        "207": { city: "Firozabad", state: "Uttar Pradesh" },
        "208": { city: "Kanpur", state: "Uttar Pradesh" },
        "209": { city: "Kanpur Dehat", state: "Uttar Pradesh" },
        "210": { city: "Banda", state: "Uttar Pradesh" },
        "211": { city: "Allahabad", state: "Uttar Pradesh" },
        "212": { city: "Allahabad", state: "Uttar Pradesh" },
        "221": { city: "Varanasi", state: "Uttar Pradesh" },
        "222": { city: "Jaunpur", state: "Uttar Pradesh" },
        "223": { city: "Sultanpur", state: "Uttar Pradesh" },
        "224": { city: "Ayodhya", state: "Uttar Pradesh" },
        "225": { city: "Barabanki", state: "Uttar Pradesh" },
        "226": { city: "Lucknow", state: "Uttar Pradesh" },
        "227": { city: "Rae Bareli", state: "Uttar Pradesh" },
        "228": { city: "Amethi", state: "Uttar Pradesh" },
        "229": { city: "Pratapgarh", state: "Uttar Pradesh" },
        "230": { city: "Azamgarh", state: "Uttar Pradesh" },
        "231": { city: "Mau", state: "Uttar Pradesh" },
        "232": { city: "Ghazipur", state: "Uttar Pradesh" },
        "233": { city: "Ballia", state: "Uttar Pradesh" },
        "241": { city: "Bareilly", state: "Uttar Pradesh" },
        "242": { city: "Shahjahanpur", state: "Uttar Pradesh" },
        "243": { city: "Moradabad", state: "Uttar Pradesh" },
        "244": { city: "Rampur", state: "Uttar Pradesh" },
        "245": { city: "Bijnor", state: "Uttar Pradesh" },
        "246": { city: "Muzaffarnagar", state: "Uttar Pradesh" },
        "247": { city: "Saharanpur", state: "Uttar Pradesh" },
        "248": { city: "Dehradun", state: "Uttarakhand" },
        "249": { city: "Haridwar", state: "Uttarakhand" },
        "250": { city: "Meerut", state: "Uttar Pradesh" },
        "251": { city: "Bagpat", state: "Uttar Pradesh" },
        "260": { city: "Sitapur", state: "Uttar Pradesh" },
        "261": { city: "Lakhimpur", state: "Uttar Pradesh" },
        "262": { city: "Pilibhit", state: "Uttar Pradesh" },
        "263": { city: "Nainital", state: "Uttarakhand" },
        "272": { city: "Gorakhpur", state: "Uttar Pradesh" },
        "273": { city: "Deoria", state: "Uttar Pradesh" },
        "274": { city: "Kushinagar", state: "Uttar Pradesh" },
        "275": { city: "Maharajganj", state: "Uttar Pradesh" },
        "276": { city: "Basti", state: "Uttar Pradesh" },
        "281": { city: "Mathura", state: "Uttar Pradesh" },
        "282": { city: "Agra", state: "Uttar Pradesh" },
        "283": { city: "Mainpuri", state: "Uttar Pradesh" },
        "284": { city: "Jhansi", state: "Uttar Pradesh" },
        "285": { city: "Jalaun", state: "Uttar Pradesh" },
        
        // Rajasthan
        "301": { city: "Alwar", state: "Rajasthan" },
        "302": { city: "Jaipur", state: "Rajasthan" },
        "303": { city: "Dausa", state: "Rajasthan" },
        "304": { city: "Tonk", state: "Rajasthan" },
        "305": { city: "Ajmer", state: "Rajasthan" },
        "306": { city: "Pali", state: "Rajasthan" },
        "307": { city: "Sirohi", state: "Rajasthan" },
        "311": { city: "Bhilwara", state: "Rajasthan" },
        "312": { city: "Chittorgarh", state: "Rajasthan" },
        "313": { city: "Udaipur", state: "Rajasthan" },
        "314": { city: "Dungarpur", state: "Rajasthan" },
        "321": { city: "Bharatpur", state: "Rajasthan" },
        "322": { city: "Dholpur", state: "Rajasthan" },
        "323": { city: "Sawai Madhopur", state: "Rajasthan" },
        "324": { city: "Kota", state: "Rajasthan" },
        "325": { city: "Bundi", state: "Rajasthan" },
        "326": { city: "Jhalawar", state: "Rajasthan" },
        "327": { city: "Banswara", state: "Rajasthan" },
        "331": { city: "Sikar", state: "Rajasthan" },
        "332": { city: "Jhunjhunu", state: "Rajasthan" },
        "333": { city: "Churu", state: "Rajasthan" },
        "334": { city: "Bikaner", state: "Rajasthan" },
        "335": { city: "Sri Ganganagar", state: "Rajasthan" },
        "341": { city: "Nagaur", state: "Rajasthan" },
        "342": { city: "Jodhpur", state: "Rajasthan" },
        "343": { city: "Jaisalmer", state: "Rajasthan" },
        "344": { city: "Barmer", state: "Rajasthan" },
        "345": { city: "Jalore", state: "Rajasthan" },
        
        // Gujarat
        "360": { city: "Rajkot", state: "Gujarat" },
        "361": { city: "Jamnagar", state: "Gujarat" },
        "362": { city: "Junagadh", state: "Gujarat" },
        "363": { city: "Bhavnagar", state: "Gujarat" },
        "364": { city: "Porbandar", state: "Gujarat" },
        "365": { city: "Amreli", state: "Gujarat" },
        "370": { city: "Kutch", state: "Gujarat" },
        "380": { city: "Ahmedabad", state: "Gujarat" },
        "382": { city: "Gandhinagar", state: "Gujarat" },
        "383": { city: "Mehsana", state: "Gujarat" },
        "384": { city: "Sabarkantha", state: "Gujarat" },
        "385": { city: "Banaskantha", state: "Gujarat" },
        "387": { city: "Kheda", state: "Gujarat" },
        "388": { city: "Anand", state: "Gujarat" },
        "389": { city: "Dahod", state: "Gujarat" },
        "390": { city: "Vadodara", state: "Gujarat" },
        "391": { city: "Vadodara", state: "Gujarat" },
        "392": { city: "Bharuch", state: "Gujarat" },
        "393": { city: "Narmada", state: "Gujarat" },
        "394": { city: "Surat", state: "Gujarat" },
        "395": { city: "Surat", state: "Gujarat" },
        "396": { city: "Navsari", state: "Gujarat" },
        "400": { city: "Mumbai", state: "Maharashtra" },
        
        // Maharashtra
        "401": { city: "Thane", state: "Maharashtra" },
        "402": { city: "Raigad", state: "Maharashtra" },
        "403": { city: "Goa", state: "Goa" },
        "410": { city: "Pune", state: "Maharashtra" },
        "411": { city: "Pune", state: "Maharashtra" },
        "412": { city: "Pune", state: "Maharashtra" },
        "413": { city: "Solapur", state: "Maharashtra" },
        "414": { city: "Ahmednagar", state: "Maharashtra" },
        "415": { city: "Satara", state: "Maharashtra" },
        "416": { city: "Kolhapur", state: "Maharashtra" },
        "421": { city: "Thane", state: "Maharashtra" },
        "422": { city: "Nashik", state: "Maharashtra" },
        "423": { city: "Nashik", state: "Maharashtra" },
        "424": { city: "Dhule", state: "Maharashtra" },
        "425": { city: "Jalgaon", state: "Maharashtra" },
        "431": { city: "Aurangabad", state: "Maharashtra" },
        "440": { city: "Nagpur", state: "Maharashtra" },
        "441": { city: "Nagpur", state: "Maharashtra" },
        "442": { city: "Wardha", state: "Maharashtra" },
        "443": { city: "Buldhana", state: "Maharashtra" },
        "444": { city: "Akola", state: "Maharashtra" },
        "445": { city: "Yavatmal", state: "Maharashtra" },
        
        // Madhya Pradesh
        "450": { city: "Khandwa", state: "Madhya Pradesh" },
        "451": { city: "Khargone", state: "Madhya Pradesh" },
        "452": { city: "Indore", state: "Madhya Pradesh" },
        "453": { city: "Indore", state: "Madhya Pradesh" },
        "454": { city: "Dhar", state: "Madhya Pradesh" },
        "455": { city: "Dewas", state: "Madhya Pradesh" },
        "456": { city: "Ujjain", state: "Madhya Pradesh" },
        "457": { city: "Ratlam", state: "Madhya Pradesh" },
        "458": { city: "Mandsaur", state: "Madhya Pradesh" },
        "460": { city: "Chhindwara", state: "Madhya Pradesh" },
        "461": { city: "Hoshangabad", state: "Madhya Pradesh" },
        "462": { city: "Bhopal", state: "Madhya Pradesh" },
        "464": { city: "Vidisha", state: "Madhya Pradesh" },
        "470": { city: "Sagar", state: "Madhya Pradesh" },
        "473": { city: "Guna", state: "Madhya Pradesh" },
        "474": { city: "Gwalior", state: "Madhya Pradesh" },
        "480": { city: "Jabalpur", state: "Madhya Pradesh" },
        "481": { city: "Jabalpur", state: "Madhya Pradesh" },
        "482": { city: "Jabalpur", state: "Madhya Pradesh" },
        "483": { city: "Katni", state: "Madhya Pradesh" },
        "484": { city: "Shahdol", state: "Madhya Pradesh" },
        "485": { city: "Satna", state: "Madhya Pradesh" },
        "486": { city: "Rewa", state: "Madhya Pradesh" },
        
        // Chhattisgarh
        "490": { city: "Durg", state: "Chhattisgarh" },
        "491": { city: "Durg", state: "Chhattisgarh" },
        "492": { city: "Raipur", state: "Chhattisgarh" },
        "493": { city: "Raipur", state: "Chhattisgarh" },
        "494": { city: "Bastar", state: "Chhattisgarh" },
        "495": { city: "Bilaspur", state: "Chhattisgarh" },
        "496": { city: "Raigarh", state: "Chhattisgarh" },
        "497": { city: "Surguja", state: "Chhattisgarh" },
        
        // Telangana & Andhra
        "500": { city: "Hyderabad", state: "Telangana" },
        "501": { city: "Hyderabad", state: "Telangana" },
        "502": { city: "Medak", state: "Telangana" },
        "503": { city: "Nizamabad", state: "Telangana" },
        "504": { city: "Adilabad", state: "Telangana" },
        "505": { city: "Karimnagar", state: "Telangana" },
        "506": { city: "Warangal", state: "Telangana" },
        "507": { city: "Khammam", state: "Telangana" },
        "508": { city: "Nalgonda", state: "Telangana" },
        "509": { city: "Mahbubnagar", state: "Telangana" },
        "515": { city: "Anantapur", state: "Andhra Pradesh" },
        "516": { city: "Kadapa", state: "Andhra Pradesh" },
        "517": { city: "Chittoor", state: "Andhra Pradesh" },
        "518": { city: "Kurnool", state: "Andhra Pradesh" },
        "520": { city: "Vijayawada", state: "Andhra Pradesh" },
        "521": { city: "Krishna", state: "Andhra Pradesh" },
        "522": { city: "Guntur", state: "Andhra Pradesh" },
        "523": { city: "Prakasam", state: "Andhra Pradesh" },
        "524": { city: "Nellore", state: "Andhra Pradesh" },
        "530": { city: "Visakhapatnam", state: "Andhra Pradesh" },
        "531": { city: "Vizianagaram", state: "Andhra Pradesh" },
        "532": { city: "Srikakulam", state: "Andhra Pradesh" },
        "533": { city: "East Godavari", state: "Andhra Pradesh" },
        "534": { city: "West Godavari", state: "Andhra Pradesh" },
        "535": { city: "Vizianagaram", state: "Andhra Pradesh" },
        
        // Karnataka
        "560": { city: "Bangalore", state: "Karnataka" },
        "561": { city: "Bangalore Rural", state: "Karnataka" },
        "562": { city: "Ramanagara", state: "Karnataka" },
        "563": { city: "Kolar", state: "Karnataka" },
        "570": { city: "Mysore", state: "Karnataka" },
        "571": { city: "Mandya", state: "Karnataka" },
        "572": { city: "Hassan", state: "Karnataka" },
        "573": { city: "Tumkur", state: "Karnataka" },
        "574": { city: "Mangalore", state: "Karnataka" },
        "575": { city: "Udupi", state: "Karnataka" },
        "576": { city: "Udupi", state: "Karnataka" },
        "577": { city: "Shimoga", state: "Karnataka" },
        "580": { city: "Hubli", state: "Karnataka" },
        "581": { city: "Dharwad", state: "Karnataka" },
        "582": { city: "Gadag", state: "Karnataka" },
        "583": { city: "Bellary", state: "Karnataka" },
        "584": { city: "Raichur", state: "Karnataka" },
        "585": { city: "Gulbarga", state: "Karnataka" },
        "586": { city: "Bijapur", state: "Karnataka" },
        "587": { city: "Bagalkot", state: "Karnataka" },
        "590": { city: "Belgaum", state: "Karnataka" },
        "591": { city: "Belgaum", state: "Karnataka" },
        
        // Tamil Nadu
        "600": { city: "Chennai", state: "Tamil Nadu" },
        "601": { city: "Chennai", state: "Tamil Nadu" },
        "602": { city: "Kanchipuram", state: "Tamil Nadu" },
        "603": { city: "Kanchipuram", state: "Tamil Nadu" },
        "604": { city: "Villupuram", state: "Tamil Nadu" },
        "605": { city: "Pondicherry", state: "Puducherry" },
        "606": { city: "Tiruvannamalai", state: "Tamil Nadu" },
        "607": { city: "Cuddalore", state: "Tamil Nadu" },
        "608": { city: "Cuddalore", state: "Tamil Nadu" },
        "609": { city: "Nagapattinam", state: "Tamil Nadu" },
        "610": { city: "Thanjavur", state: "Tamil Nadu" },
        "611": { city: "Thanjavur", state: "Tamil Nadu" },
        "612": { city: "Thanjavur", state: "Tamil Nadu" },
        "613": { city: "Thanjavur", state: "Tamil Nadu" },
        "614": { city: "Thiruvarur", state: "Tamil Nadu" },
        "620": { city: "Trichy", state: "Tamil Nadu" },
        "621": { city: "Trichy", state: "Tamil Nadu" },
        "622": { city: "Pudukkottai", state: "Tamil Nadu" },
        "623": { city: "Ramanathapuram", state: "Tamil Nadu" },
        "624": { city: "Dindigul", state: "Tamil Nadu" },
        "625": { city: "Madurai", state: "Tamil Nadu" },
        "626": { city: "Virudhunagar", state: "Tamil Nadu" },
        "627": { city: "Tirunelveli", state: "Tamil Nadu" },
        "628": { city: "Tuticorin", state: "Tamil Nadu" },
        "629": { city: "Kanyakumari", state: "Tamil Nadu" },
        "630": { city: "Sivaganga", state: "Tamil Nadu" },
        "631": { city: "Kanchipuram", state: "Tamil Nadu" },
        "632": { city: "Vellore", state: "Tamil Nadu" },
        "635": { city: "Krishnagiri", state: "Tamil Nadu" },
        "636": { city: "Salem", state: "Tamil Nadu" },
        "637": { city: "Namakkal", state: "Tamil Nadu" },
        "638": { city: "Erode", state: "Tamil Nadu" },
        "639": { city: "Karur", state: "Tamil Nadu" },
        "641": { city: "Coimbatore", state: "Tamil Nadu" },
        "642": { city: "Coimbatore", state: "Tamil Nadu" },
        "643": { city: "Nilgiris", state: "Tamil Nadu" },
        
        // Kerala
        "670": { city: "Kannur", state: "Kerala" },
        "671": { city: "Kasaragod", state: "Kerala" },
        "673": { city: "Kozhikode", state: "Kerala" },
        "676": { city: "Malappuram", state: "Kerala" },
        "678": { city: "Palakkad", state: "Kerala" },
        "679": { city: "Thrissur", state: "Kerala" },
        "680": { city: "Thrissur", state: "Kerala" },
        "682": { city: "Ernakulam", state: "Kerala" },
        "683": { city: "Ernakulam", state: "Kerala" },
        "685": { city: "Idukki", state: "Kerala" },
        "686": { city: "Kottayam", state: "Kerala" },
        "688": { city: "Alappuzha", state: "Kerala" },
        "689": { city: "Pathanamthitta", state: "Kerala" },
        "690": { city: "Kollam", state: "Kerala" },
        "691": { city: "Kollam", state: "Kerala" },
        "695": { city: "Thiruvananthapuram", state: "Kerala" },
        
        // West Bengal
        "700": { city: "Kolkata", state: "West Bengal" },
        "711": { city: "Howrah", state: "West Bengal" },
        "712": { city: "Hooghly", state: "West Bengal" },
        "713": { city: "Burdwan", state: "West Bengal" },
        "721": { city: "Midnapore", state: "West Bengal" },
        "722": { city: "Bankura", state: "West Bengal" },
        "723": { city: "Purulia", state: "West Bengal" },
        "731": { city: "Birbhum", state: "West Bengal" },
        "732": { city: "Murshidabad", state: "West Bengal" },
        "733": { city: "Malda", state: "West Bengal" },
        "734": { city: "Darjeeling", state: "West Bengal" },
        "735": { city: "Jalpaiguri", state: "West Bengal" },
        "736": { city: "Cooch Behar", state: "West Bengal" },
        "741": { city: "Nadia", state: "West Bengal" },
        "742": { city: "Murshidabad", state: "West Bengal" },
        "743": { city: "North 24 Parganas", state: "West Bengal" },
        
        // Odisha
        "751": { city: "Bhubaneswar", state: "Odisha" },
        "752": { city: "Cuttack", state: "Odisha" },
        "753": { city: "Cuttack", state: "Odisha" },
        "754": { city: "Jagatsinghpur", state: "Odisha" },
        "755": { city: "Puri", state: "Odisha" },
        "756": { city: "Balasore", state: "Odisha" },
        "757": { city: "Bhadrak", state: "Odisha" },
        "758": { city: "Kendrapara", state: "Odisha" },
        "759": { city: "Jajpur", state: "Odisha" },
        "760": { city: "Ganjam", state: "Odisha" },
        "761": { city: "Ganjam", state: "Odisha" },
        "762": { city: "Gajapati", state: "Odisha" },
        "763": { city: "Koraput", state: "Odisha" },
        "764": { city: "Kalahandi", state: "Odisha" },
        "765": { city: "Rayagada", state: "Odisha" },
        "766": { city: "Kalahandi", state: "Odisha" },
        "767": { city: "Bargarh", state: "Odisha" },
        "768": { city: "Sambalpur", state: "Odisha" },
        "769": { city: "Sundargarh", state: "Odisha" },
        "770": { city: "Rourkela", state: "Odisha" },
        
        // Jharkhand
        "814": { city: "Dumka", state: "Jharkhand" },
        "815": { city: "Deoghar", state: "Jharkhand" },
        "816": { city: "Godda", state: "Jharkhand" },
        "825": { city: "Hazaribagh", state: "Jharkhand" },
        "826": { city: "Giridih", state: "Jharkhand" },
        "827": { city: "Bokaro", state: "Jharkhand" },
        "828": { city: "Dhanbad", state: "Jharkhand" },
        "829": { city: "Dhanbad", state: "Jharkhand" },
        "831": { city: "Jamshedpur", state: "Jharkhand" },
        "832": { city: "Seraikela", state: "Jharkhand" },
        "833": { city: "Chaibasa", state: "Jharkhand" },
        "834": { city: "Ranchi", state: "Jharkhand" },
        "835": { city: "Ranchi", state: "Jharkhand" },
        
        // Bihar
        "800": { city: "Patna", state: "Bihar" },
        "801": { city: "Patna", state: "Bihar" },
        "802": { city: "Bhojpur", state: "Bihar" },
        "803": { city: "Nalanda", state: "Bihar" },
        "804": { city: "Gaya", state: "Bihar" },
        "805": { city: "Nawada", state: "Bihar" },
        "806": { city: "Munger", state: "Bihar" },
        "807": { city: "Bhagalpur", state: "Bihar" },
        "808": { city: "Banka", state: "Bihar" },
        "811": { city: "Lakhisarai", state: "Bihar" },
        "812": { city: "Bhagalpur", state: "Bihar" },
        "813": { city: "Katihar", state: "Bihar" },
        "841": { city: "Saran", state: "Bihar" },
        "842": { city: "Vaishali", state: "Bihar" },
        "843": { city: "Muzaffarpur", state: "Bihar" },
        "844": { city: "Sitamarhi", state: "Bihar" },
        "845": { city: "Madhubani", state: "Bihar" },
        "846": { city: "Darbhanga", state: "Bihar" },
        "847": { city: "Samastipur", state: "Bihar" },
        "848": { city: "Begusarai", state: "Bihar" },
        "851": { city: "Khagaria", state: "Bihar" },
        "852": { city: "Saharsa", state: "Bihar" },
        "853": { city: "Supaul", state: "Bihar" },
        "854": { city: "Purnia", state: "Bihar" },
        "855": { city: "Kishanganj", state: "Bihar" },
        
        // Assam & NE
        "781": { city: "Guwahati", state: "Assam" },
        "782": { city: "Guwahati", state: "Assam" },
        "783": { city: "Barpeta", state: "Assam" },
        "784": { city: "Nalbari", state: "Assam" },
        "785": { city: "Jorhat", state: "Assam" },
        "786": { city: "Dibrugarh", state: "Assam" },
        "787": { city: "Tinsukia", state: "Assam" },
        "788": { city: "Silchar", state: "Assam" },
        "790": { city: "Itanagar", state: "Arunachal Pradesh" },
        "791": { city: "Itanagar", state: "Arunachal Pradesh" },
        "792": { city: "Papum Pare", state: "Arunachal Pradesh" },
        "793": { city: "Shillong", state: "Meghalaya" },
        "794": { city: "Jaintia Hills", state: "Meghalaya" },
        "795": { city: "Imphal", state: "Manipur" },
        "796": { city: "Aizawl", state: "Mizoram" },
        "797": { city: "Kohima", state: "Nagaland" },
        "798": { city: "Dimapur", state: "Nagaland" },
        "799": { city: "Agartala", state: "Tripura" },
    };
    
    // Specific pincode overrides for accuracy
    const exactPincodes: { [key: string]: { city: string; state: string } } = {
        // Greater Noida
        "201306": { city: "Greater Noida", state: "Uttar Pradesh" },
        "201308": { city: "Greater Noida", state: "Uttar Pradesh" },
        "201310": { city: "Greater Noida", state: "Uttar Pradesh" },
        "201312": { city: "Greater Noida", state: "Uttar Pradesh" },
        "201313": { city: "Greater Noida", state: "Uttar Pradesh" },
        "201314": { city: "Greater Noida", state: "Uttar Pradesh" },
        "201318": { city: "Greater Noida", state: "Uttar Pradesh" },
        // Noida
        "201301": { city: "Noida", state: "Uttar Pradesh" },
        "201303": { city: "Noida", state: "Uttar Pradesh" },
        "201304": { city: "Noida", state: "Uttar Pradesh" },
        "201305": { city: "Noida", state: "Uttar Pradesh" },
        "201307": { city: "Noida", state: "Uttar Pradesh" },
        // Ghaziabad
        "201001": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "201002": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "201003": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "201005": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "201009": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "201010": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "201012": { city: "Ghaziabad", state: "Uttar Pradesh" },
        "201014": { city: "Ghaziabad", state: "Uttar Pradesh" },
        // Faridabad
        "121001": { city: "Faridabad", state: "Haryana" },
        "121002": { city: "Faridabad", state: "Haryana" },
        "121003": { city: "Faridabad", state: "Haryana" },
        "121004": { city: "Faridabad", state: "Haryana" },
        // Gurgaon
        "122001": { city: "Gurgaon", state: "Haryana" },
        "122002": { city: "Gurgaon", state: "Haryana" },
        "122003": { city: "Gurgaon", state: "Haryana" },
        "122004": { city: "Gurgaon", state: "Haryana" },
        "122008": { city: "Gurgaon", state: "Haryana" },
        "122009": { city: "Gurgaon", state: "Haryana" },
        "122015": { city: "Gurgaon", state: "Haryana" },
        "122016": { city: "Gurgaon", state: "Haryana" },
        "122017": { city: "Gurgaon", state: "Haryana" },
        "122018": { city: "Gurgaon", state: "Haryana" },
        // Delhi specific
        "110001": { city: "New Delhi", state: "Delhi" },
        "110002": { city: "New Delhi", state: "Delhi" },
        "110003": { city: "New Delhi", state: "Delhi" },
        "110085": { city: "North Delhi", state: "Delhi" },
        "110092": { city: "East Delhi", state: "Delhi" },
        "110096": { city: "East Delhi", state: "Delhi" },
    };
    
    // Check exact pincode first
    if (exactPincodes[pincode]) {
        return exactPincodes[pincode];
    }
    
    // Check by prefix (first 3 digits)
    const prefix = pincode.substring(0, 3);
    if (pincodeData[prefix]) {
        return pincodeData[prefix];
    }
    
    return null;
};

export default function ProfilePage() {
    const { user } = useCart();
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [fetchingPincode, setFetchingPincode] = useState(false);
    const [availableCities, setAvailableCities] = useState<string[]>([]);
    
    // Personal Details
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [alternatePhone, setAlternatePhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    
    // Address Details
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [addressType, setAddressType] = useState<'home' | 'office'>('home');
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            if (!user) {
                router.push('/login');
            } else {
                const meta = user.user_metadata;
                setFullName(meta?.full_name || '');
                setPhone(meta?.phone || '');
                setAlternatePhone(meta?.alternate_phone || '');
                setDateOfBirth(meta?.date_of_birth || '');
                setAvatarUrl(meta?.avatar_url || '');
                setAddressLine1(meta?.address_line1 || '');
                setAddressLine2(meta?.address_line2 || '');
                setLandmark(meta?.landmark || '');
                setPincode(meta?.pincode || '');
                setCity(meta?.city || '');
                setState(meta?.state || '');
                setAddressType(meta?.address_type || 'home');
                // Set available cities based on saved state
                if (meta?.state && CITIES_BY_STATE[meta.state]) {
                    setAvailableCities(CITIES_BY_STATE[meta.state]);
                }
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [user, router]);

    // Update available cities when state changes
    const handleStateChange = (newState: string) => {
        setState(newState);
        setCity(''); // Reset city when state changes
        if (CITIES_BY_STATE[newState]) {
            setAvailableCities(CITIES_BY_STATE[newState]);
        } else {
            setAvailableCities([]);
        }
    };

    // Auto-fetch city and state when pincode changes
    const handlePincodeChange = async (value: string) => {
        setPincode(value);
        if (value.length === 6) {
            setFetchingPincode(true);
            const result = await fetchCityState(value);
            if (result) {
                setState(result.state);
                if (CITIES_BY_STATE[result.state]) {
                    setAvailableCities(CITIES_BY_STATE[result.state]);
                }
                setCity(result.city);
            }
            setFetchingPincode(false);
        }
    };

    const handleSave = async () => {
        if (!fullName.trim()) {
            alert('Please enter your full name');
            return;
        }

        // Validate age (must be 18+)
        if (dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                alert('You must be at least 18 years old to use this service.');
                return;
            }
            if (birthDate > today) {
                alert('Date of birth cannot be in the future.');
                return;
            }
            if (age > 120) {
                alert('Please enter a valid date of birth.');
                return;
            }
        }

        setSaving(true);
        try {
            console.log('Saving profile...', { fullName, phone, alternatePhone, dateOfBirth });
            
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    full_name: fullName,
                    phone: phone,
                    alternate_phone: alternatePhone,
                    date_of_birth: dateOfBirth,
                    address_line1: addressLine1,
                    address_line2: addressLine2,
                    landmark: landmark,
                    pincode: pincode,
                    city: city,
                    state: state,
                    address_type: addressType,
                }
            });

            console.log('Update response:', { data, error });

            if (error) throw error;

            alert('Profile updated successfully!');
            setEditing(false);
        } catch (error: any) {
            console.error('Error updating profile:', error);
            alert('Error updating profile: ' + (error.message || 'Unknown error'));
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        const meta = user?.user_metadata;
        setFullName(meta?.full_name || '');
        setPhone(meta?.phone || '');
        setAlternatePhone(meta?.alternate_phone || '');
        setDateOfBirth(meta?.date_of_birth || '');
        setAddressLine1(meta?.address_line1 || '');
        setAddressLine2(meta?.address_line2 || '');
        setLandmark(meta?.landmark || '');
        setPincode(meta?.pincode || '');
        setCity(meta?.city || '');
        setState(meta?.state || '');
        setAddressType(meta?.address_type || 'home');
        setEditing(false);
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Avatar upload triggered");
        
        if (!event.target.files || event.target.files.length === 0) {
            console.log("No file selected");
            return;
        }

        if (!user) {
            alert('Please login first');
            return;
        }

        const file = event.target.files[0];
        console.log("File selected:", file.name, file.size, file.type);

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            return;
        }

        setUploading(true);

        try {
            // Create file path: userId/avatar.ext
            const fileExt = file.name.split('.').pop();
            const filePath = `${user.id}/avatar.${fileExt}`;

            // Delete old avatar if exists (ignore errors)
            await supabase.storage.from('avatars').remove([filePath]);

            // Upload new avatar to Supabase Storage
            const { data, error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const publicUrl = urlData.publicUrl + '?t=' + Date.now(); // Add timestamp to bust cache

            // Update user metadata with avatar URL
            const { error: updateError } = await supabase.auth.updateUser({
                data: {
                    avatar_url: publicUrl
                }
            });

            if (updateError) {
                throw updateError;
            }

            setAvatarUrl(publicUrl);
            
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            
            console.log("Avatar uploaded successfully:", publicUrl);
            alert('Profile picture updated!');

        } catch (error: any) {
            console.error('Avatar upload error:', error);
            alert('Error uploading avatar: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">Please log in to view your profile</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Sidebar - Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center border border-gray-100 sticky top-28">
                        <div className="relative group mb-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                                {avatarUrl ? (
                                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-black text-white flex items-center justify-center text-4xl font-bold">
                                        {user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Edit Avatar Button - Only show in edit mode */}
                            {editing && (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="absolute bottom-0 right-0 bg-black text-white p-2.5 rounded-full shadow-md hover:bg-gray-800 transition-all disabled:opacity-50"
                                    title="Change profile picture"
                                >
                                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                </button>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAvatarUpload}
                                accept="image/*"
                                className="hidden"
                                title="Upload profile picture"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {fullName || 'User'}
                        </h1>
                        <p className="text-sm text-gray-500 mb-6">{user?.email}</p>

                        <div className="w-full space-y-3">
                            <button
                                onClick={() => router.push('/')}
                                className="w-full py-3 px-4 bg-white border border-gray-200 text-gray-900 rounded-xl font-medium hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4" /> Continue Shopping
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await supabase.auth.signOut();
                                        localStorage.removeItem('cart');
                                        router.push('/login');
                                        router.refresh();
                                    } catch (error) {
                                        console.error('Sign out error:', error);
                                        window.location.href = '/login';
                                    }
                                }}
                                className="w-full py-3 px-4 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-all flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Content - Details */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                                <p className="text-gray-500 text-sm mt-1">Manage your personal details</p>
                            </div>
                            {!editing ? (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
                                >
                                    <Edit2 className="w-3.5 h-3.5" /> Edit Details
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCancel}
                                        disabled={saving}
                                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full text-sm font-medium transition-all disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-all shadow-md shadow-green-200 disabled:opacity-50"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-3.5 h-3.5" />
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8">
                            {/* Personal Details Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Phone className="w-5 h-5" /> Personal Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name *</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="John Doe"
                                                required
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.full_name || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Date of Birth */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> Date of Birth
                                        </label>
                                        {editing ? (
                                            <input
                                                type="date"
                                                value={dateOfBirth}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    // Validate year is 4 digits max
                                                    const year = value.split('-')[0];
                                                    if (year && year.length <= 4) {
                                                        setDateOfBirth(value);
                                                    }
                                                }}
                                                max="2007-12-03"
                                                min="1900-01-01"
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.date_of_birth ? new Date(user.user_metadata.date_of_birth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                        {editing && <p className="text-xs text-gray-400">🎂 Must be 18+ years old (Born before Dec 2007)</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                                        {editing ? (
                                            <input
                                                type="tel"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.phone || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Alternate Phone */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Alternate Phone</label>
                                        {editing ? (
                                            <input
                                                type="tel"
                                                value={alternatePhone}
                                                onChange={(e) => setAlternatePhone(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="+91 98765 43210"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.alternate_phone || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                        {editing && <p className="text-xs text-gray-400">Backup number for delivery</p>}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2 mt-6">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <span className="font-medium text-gray-600">{user?.email}</span>
                                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">Verified</span>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100"></div>

                            {/* Address Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" /> Delivery Address
                                </h3>
                                
                                {/* Address Type Toggle */}
                                <div className="mb-6">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 block">Address Type</label>
                                    <div className="flex gap-3">
                                        <button
                                            type="button"
                                            onClick={() => editing && setAddressType('home')}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                                addressType === 'home' 
                                                    ? 'bg-black text-white' 
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            } ${!editing && 'cursor-default'}`}
                                        >
                                            <Home className="w-4 h-4" /> Home
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => editing && setAddressType('office')}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                                                addressType === 'office' 
                                                    ? 'bg-black text-white' 
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            } ${!editing && 'cursor-default'}`}
                                        >
                                            <Building2 className="w-4 h-4" /> Office
                                        </button>
                                    </div>
                                    {editing && addressType === 'office' && (
                                        <p className="text-xs text-amber-600 mt-2">📦 Office addresses may not receive Sunday deliveries</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Address Line 1 */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address Line 1</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={addressLine1}
                                                onChange={(e) => setAddressLine1(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="House No, Building Name, Apartment"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.address_line1 || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Address Line 2 */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Address Line 2</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={addressLine2}
                                                onChange={(e) => setAddressLine2(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="Road, Area, Colony"
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.address_line2 || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Landmark */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Landmark</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={landmark}
                                                onChange={(e) => setLandmark(e.target.value)}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                placeholder="Near Hospital, Behind Mall, etc."
                                            />
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.landmark || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Pincode */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pincode</label>
                                        {editing ? (
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={pincode}
                                                    onChange={(e) => handlePincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                    placeholder="110001"
                                                    maxLength={6}
                                                />
                                                {fetchingPincode && (
                                                    <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.pincode || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* State */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">State</label>
                                        {editing ? (
                                            <div className="relative">
                                                <select
                                                    value={state}
                                                    onChange={(e) => handleStateChange(e.target.value)}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="">Select State</option>
                                                    {INDIAN_STATES.map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                            </div>
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.state || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">City</label>
                                        {editing ? (
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    list="city-list"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                                    placeholder={state ? "Type or select city" : "Select state first"}
                                                    disabled={!state}
                                                />
                                                <datalist id="city-list">
                                                    {availableCities.map((c) => (
                                                        <option key={c} value={c} />
                                                    ))}
                                                </datalist>
                                                {fetchingPincode && (
                                                    <Loader2 className="w-4 h-4 animate-spin absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                                )}
                                            </div>
                                        ) : (
                                            <div className="p-3 bg-gray-50 rounded-xl border border-transparent">
                                                <span className="font-medium text-gray-900">
                                                    {user.user_metadata?.city || 'Not provided'}
                                                </span>
                                            </div>
                                        )}
                                        {editing && state && (
                                            <p className="text-xs text-gray-400">Type your city or select from suggestions</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
