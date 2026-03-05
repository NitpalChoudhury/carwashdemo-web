import PricingTable from "../components/PricingTable";

function PricingPage(){

return(

<div className="page-shell py-12">

<h1 className="text-4xl font-bold text-white mb-6">
Service Price List
</h1>

<p className="text-gray-400 mb-10">
Detailed pricing for all car detailing services.
</p>

<PricingTable/>

</div>

);

}

export default PricingPage;