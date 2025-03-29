<template>
    <div class="container mx-auto p-4">
        <div class="flex flex-wrap">
            <!-- Left Column for Event Details and Payment Methods -->
            <div class="w-full md:w-2/3 p-4">
                <div class="bg-white p-4 shadow rounded">
                    <h2 class="text-xl font-bold mb-4">Event</h2>
                    <p>Actual Event: [Event Name]</p>
                    <p>Participation Date: [Date]</p>
                    <p>Current Number of Registrants: [Number]</p>
                    <!-- Add main contact information -->
                    <div class="mt-4">
                        <h3 class="text-lg font-bold mb-3">Main Contact</h3>
                        <p>Name: {{ payDetail.Name }}</p>
                        <p>Phone: {{ payDetail.Phone }}</p>
                        <p>Email: {{ payDetail.Email }}</p>
                        <p>Date of Birth: {{ payDetail.DOB }}</p>
                        <p>Age: {{ payDetail.Age }}</p>
                        <p>Gender: {{ payDetail.Gender }}</p>
                    </div>
                    <!-- Dynamic participant information based on number of participants -->
                    <!-- <div
                        v-for="n in payDetail.NumParticipants"
                        :key="n"
                        class="mt-4"
                    >
                        <h4 class="text-md font-bold mb-2">
                            Participant {{ n }}
                        </h4>
                        <p>Name: {{ payDetail.Participants[n - 1].Name }}</p>
                        <p>Phone: {{ payDetail.Participants[n - 1].Phone }}</p>
                        <p>
                            Date of Birth:
                            {{ payDetail.Participants[n - 1].DOB }}
                        </p>
                        <p>Age: {{ payDetail.Participants[n - 1].Age }}</p>
                        <p>
                            Gender: {{ payDetail.Participants[n - 1].Gender }}
                        </p>
                    </div>
                    <div class="mt-4">
                        <label for="numParticipants" class="block mb-2">
                            Number of Participants:
                        </label>
                        <div class="flex items-center">
                            <button
                                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 p-2 rounded-l cursor-pointer"
                                @click="payDetail.NumParticipants--"
                            >
                                -
                            </button>
                            <input
                                id="numParticipants"
                                v-model="payDetail.NumParticipants"
                                type="number"
                                class="text-center w-12 border appearance-none border-gray-400 rounded shadow p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                class="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 p-2 rounded-r cursor-pointer"
                                @click="payDetail.NumParticipants++"
                            >
                                +
                            </button>
                        </div>
                        <p class="mt-2">Amount per Person: $[Amount]</p>
                    </div> -->
                </div>
                <!-- coupon -->
                <div class="mt-6 bg-white p-4 shadow rounded">
                    <h3 class="text-lg font-bold mb-3">Coupon</h3>
                    <div class="flex items-center">
                        <input
                            type="text"
                            class="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter Coupon"
                        />
                        <button
                            class="bg-blue-500 text-white py-2 px-4 m-1 rounded hover:bg-blue-600"
                        >
                            Apply
                        </button>
                    </div>
                </div>
                <!-- Payment Methods -->
                <div class="mt-6 bg-white p-4 shadow rounded">
                    <h3 class="text-lg font-bold">Payment Methods</h3>
                    <span class="text-sm text-gray-500">
                        Using SSL 256-bit highest security level encryption,
                        payment information is kept secure.
                    </span>
                    <div class="flex flex-wrap my-3">
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'Credit Card',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'Credit Card',
                            }"
                            @click="payDetail.PaymentMethod = 'Credit Card'"
                        >
                            <Icon name="cil:credit-card" />
                            Credit Card
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'Bank Transfer',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'Bank Transfer',
                            }"
                            @click="payDetail.PaymentMethod = 'Bank Transfer'"
                        >
                            <Icon name="mdi:bank-transfer-in" />
                            Bank Transfer
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'Line Pay',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'Line Pay',
                            }"
                            @click="payDetail.PaymentMethod = 'Line Pay'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/linePay.png"
                                alt="Line Pay"
                                width="20"
                                height="20"
                            />
                            Line Pay
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'JKOPay',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'JKOPay',
                            }"
                            @click="payDetail.PaymentMethod = 'JKOPay'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/JKOPay.png"
                                alt="JKOPay"
                                width="20"
                                height="20"
                            />
                            JKOPay
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'EasyWallet',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'EasyWallet',
                            }"
                            @click="payDetail.PaymentMethod = 'EasyWallet'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/EasyWallet.png"
                                alt="EasyWallet"
                                width="20"
                                height="20"
                            />
                            Easy Wallet
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'PXPayPlus',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'PXPayPlus',
                            }"
                            @click="payDetail.PaymentMethod = 'PXPayPlus'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/PXPayPlus.png"
                                alt="PXPayPlus"
                                width="20"
                                height="20"
                            />
                            PX Pay plus
                        </button>

                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === '711',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== '711',
                            }"
                            @click="payDetail.PaymentMethod = '711'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/711.png"
                                alt="7-11 ibon"
                                width="20"
                                height="20"
                            />
                            ibon
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'FamilyMart',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'FamilyMart',
                            }"
                            @click="payDetail.PaymentMethod = 'FamilyMart'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/FamilyMart.png"
                                alt="FamilyMart"
                                width="20"
                                height="20"
                            />
                            FamiPort
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'HiLife',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'HiLife',
                            }"
                            @click="payDetail.PaymentMethod = 'HiLife'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/HiLife.png"
                                alt="HiLife"
                                width="20"
                                height="20"
                            />
                            Life-ET
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'OK',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'OK',
                            }"
                            @click="payDetail.PaymentMethod = 'OK'"
                        >
                            <NuxtImg
                                src="/imgs/icon/payMent/OK.png"
                                alt="OK"
                                width="20"
                                height="20"
                            />
                            OK-go
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'Apple Pay',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'Apple Pay',
                            }"
                            @click="payDetail.PaymentMethod = 'Apple Pay'"
                        >
                            <Icon name="simple-icons:applepay" />
                            Apple Pay
                        </button>
                        <button
                            class="py-2 px-4 m-1 rounded flex items-center gap-2"
                            :class="{
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    payDetail.PaymentMethod === 'Google Pay',
                                'bg-gray-100 hover:bg-gray-600 hover:text-white':
                                    payDetail.PaymentMethod !== 'Google Pay',
                            }"
                            @click="payDetail.PaymentMethod = 'Google Pay'"
                        >
                            <Icon name="simple-icons:googlepay" />
                            Google Pay
                        </button>
                    </div>
                    <div class="mt-4">
                        <p>
                            {{ paymentDescription }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Right Column for Payment Summary -->
            <div class="w-full md:w-1/3 p-4">
                <div class="bg-white p-4 shadow rounded">
                    <h2 class="text-xl font-bold mb-4">Checkout Summary</h2>
                    <div class="mb-4">
                        <p>Total Goods: $[Total]</p>
                        <p>Discount: -$[Discount]</p>
                        <p>Shipping: $[Shipping]</p>
                    </div>
                    <div class="bg-orange-200 p-4 rounded">
                        <p class="text-lg font-bold">
                            Total: $[Total Checkout]
                        </p>
                    </div>
                    <button
                        class="mt-4 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 w-full"
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    // Import ref from Vue to ensure reactivity
    import { ref } from 'vue'

    const route = useRoute()
    const id = route.params.id

    // Define the PayDetail interface
    interface PayDetail {
        Type: string
        Name: string
        Phone: number
        Email: string
        PaymentMethod: string
        Memo: string
        Total: number
        Discount: number
        Shipping: number
        TotalCheckout: number
        NumParticipants: number
        DOB: string
        Age: number
        Gender: string
        Participants: Array<{
            Name: string
            Phone: number
            DOB: string
            Age: number
            Gender: string
        }>
    }

    const event = ref<Event>()
    const payDetail = ref<PayDetail>({
        Type: 'Event',
        Name: '',
        Phone: 0,
        Email: '',
        PaymentMethod: '',
        Memo: '',
        Total: 0,
        Discount: 0,
        NumParticipants: 1,
        Shipping: 0,
        TotalCheckout: 0,
        DOB: '',
        Age: 0,
        Gender: '',
        Participants: [],
    })
    const paymentDescription = computed(() => {
        if (payDetail.value.PaymentMethod === 'Line Pay') {
            return `Use LINE Points to offset consumption, 1 point equals 1 dollar, no upper limit for offset!`
        } else if (payDetail.value.PaymentMethod === 'Credit Card') {
            return `No handling fee, accepts Visa, MasterCard, JCB credit cards issued by major banks in Taiwan.`
        } else if (payDetail.value.PaymentMethod === 'JKOPay') {
            return `Pay with JKOPay account balance or linked bank account, enjoy 1% JKOPay coin reward with no upper limit! 1 JKOPay coin equals 1 dollar.`
        } else if (
            ['711', 'FamilyMart', 'HiLife', 'OK'].includes(
                payDetail.value.PaymentMethod
            )
        ) {
            return `An additional machine handling fee of $20 will be charged. You need to print the document at the FamilyMart FamiPort terminal and pay at the counter before 12 AM tomorrow.`
        }
    })

    onMounted(async () => {
        await getEvent()
        // Ensure Participants array is initialized properly
        if (
            !payDetail.value.Participants ||
            payDetail.value.Participants.length <
                payDetail.value.NumParticipants
        ) {
            payDetail.value.Participants = Array(
                payDetail.value.NumParticipants
            )
                .fill({})
                .map(() => ({
                    Name: '',
                    Phone: 0,
                    DOB: '',
                    Age: 0,
                    Gender: '',
                }))
        }
    })

    const getEvent = async () => {
        const { data } = await useFetch(`/api/events/${id}`)
        event.value = data.value as Event
        console.log(event.value)
    }
</script>

<style scoped lang="scss"></style>
