# Yearly Spending Shows $0.00 - Solution Guide

## Problem
Dashboard shows:
- Total Active: 2
- Monthly Spending: $20.00
- Yearly Spending: $0.00 ❌

## Root Cause
You don't have any subscriptions with `frequency: "yearly"`. 
- All your subscriptions are set to "monthly"
- Only monthly subscriptions count toward "Monthly Spending"
- Only yearly subscriptions count toward "Yearly Spending"

---

## Solution: Add a Yearly Subscription

### Step 1: Go to "All Subscriptions"
Click on the "All Subscriptions" tab in the sidebar

### Step 2: Click "Add Subscription" Button
A modal form will open

### Step 3: Fill in the Form

**Example Yearly Subscription:**

| Field | Value |
|-------|-------|
| Subscription Name | `Microsoft 365` |
| Price | `99.99` |
| **Billing Frequency** | **Yearly** ← This is KEY |
| Category | Productivity |
| Description | (optional) |

### Step 4: Make Sure "Frequency" = "Yearly"

```
Subscription Name: Microsoft 365
Price: $99.99
Billing Frequency: [Yearly] ← SELECT THIS
Category: Productivity
Description: Annual subscription
```

### Step 5: Click "Save Subscription"

---

## What Happens

### Before (Only Monthly):
```
Total Active: 2
Monthly Spending: $20.00 (Netflix $15.99 + Spotify $4.01)
Yearly Spending: $0.00 ❌
```

### After (Monthly + Yearly):
```
Total Active: 3
Monthly Spending: $20.00 (Netflix $15.99 + Spotify $4.01)
Yearly Spending: $99.99 (Microsoft 365) ✅
```

---

## Examples of Yearly Subscriptions

| Service | Annual Price | Monthly Equivalent |
|---------|--------------|-------------------|
| Microsoft 365 | $99.99 | ~$8.33/month |
| Adobe Creative Cloud | $239.88 | ~$20/month |
| Apple One | $179.95 | ~$15/month |
| Discord Nitro | $119.88 | ~$10/month |
| YouTube Premium | $139.99 | ~$11.67/month |
| ChatGPT Plus | $200/year | ~$16.67/month |

---

## How Stats Are Calculated

### Backend Logic:
```javascript
// Only counts ACTIVE subscriptions with frequency = "yearly"
const yearlyTotal = subscriptions
  .filter((sub) => sub.status === 'active' && sub.frequency === 'yearly')
  .reduce((sum, sub) => sum + sub.price, 0);

// Result: Sum of all yearly subscription prices
```

### Example Calculation:
```
Subscriptions:
  ✓ Netflix (monthly) $15.99 → Not counted
  ✓ Spotify (monthly) $4.01  → Not counted
  ✓ Microsoft 365 (yearly) $99.99 → COUNTED
  ✓ YouTube Premium (yearly) $139.99 → COUNTED
  ✗ Old Service (paused) → Not counted

Yearly Spending = $99.99 + $139.99 = $239.98
```

---

## Frequency Field Options

When adding a subscription, you can choose:

### Monthly
- Charges every month
- Example: Netflix, Spotify, Gym membership
- Counts toward "Monthly Spending"

### Yearly
- Charges once per year
- Example: Microsoft 365, Domain registration, Hosting
- Counts toward "Yearly Spending"

---

## Testing Steps

### Test 1: Add First Yearly Subscription
1. Go to "All Subscriptions"
2. Click "Add Subscription"
3. Fill form:
   - Name: `Adobe Creative Cloud`
   - Price: `239.88`
   - Frequency: **Yearly**
   - Category: Productivity
4. Click "Save"
5. Go back to Dashboard
6. Check "Yearly Spending" - should now show `$239.88`

### Test 2: Add Second Yearly Subscription
1. Repeat process with:
   - Name: `Apple One`
   - Price: `179.95`
   - Frequency: **Yearly**
2. Go to Dashboard
3. "Yearly Spending" should now show `$419.83` (239.88 + 179.95)

### Test 3: Verify Monthly Unchanged
- Monthly Spending should stay the same
- Only new yearly subscriptions affect yearly total

---

## Dashboard Stats Explained

### Total Active
**Count of all active subscriptions** (both monthly and yearly)
```
Netflix (monthly, active) ✓
Spotify (monthly, active) ✓
Microsoft 365 (yearly, active) ✓
Old Service (monthly, paused) ✗

Total Active = 3
```

### Monthly Spending
**Sum of all ACTIVE subscriptions with frequency = "monthly"**
```
Netflix (monthly, active) $15.99 ✓
Spotify (monthly, active) $4.01 ✓
Microsoft 365 (yearly, active) - ✗ Not counted

Monthly Spending = $20.00
```

### Yearly Spending
**Sum of all ACTIVE subscriptions with frequency = "yearly"**
```
Netflix (monthly, active) - ✗ Not counted
Spotify (monthly, active) - ✗ Not counted
Microsoft 365 (yearly, active) $99.99 ✓
Adobe (yearly, active) $239.88 ✓

Yearly Spending = $339.87
```

---

## What if Yearly Spending is Still $0.00?

### Checklist:
1. [ ] Added subscription with frequency "yearly" (not "monthly")
2. [ ] Subscription status is "active" (not "paused")
3. [ ] Page refreshed after adding
4. [ ] Backend running and connected
5. [ ] MongoDB has the subscription saved

### Debug Steps:
1. Check MongoDB Compass:
   - Open: `subscription-manager` database
   - Check: `subscriptions` collection
   - Look for: `"frequency": "yearly"`

2. Check if subscription was saved:
   - Go to "All Subscriptions"
   - Should see the yearly subscription in the list
   - Verify frequency shows as "Yearly"

3. Refresh Dashboard:
   - Sometimes stats don't update immediately
   - Refresh browser (F5)
   - Check stats again

---

## Common Mistakes

| Mistake | Fix |
|--------|-----|
| Selected "Monthly" instead of "Yearly" | Select "Yearly" from dropdown |
| Subscription status is "paused" | Only active subscriptions count |
| Subscription has "expired" status | Only "active" subscriptions count |
| Forgot to click "Save Subscription" | Click save button |
| Page not refreshed | Refresh browser (F5) |
| Backend not running | Check backend is running |

---

## Formula

```
Yearly Spending = Σ(price) where frequency='yearly' AND status='active'

For your case:
Yearly Spending = 0 (because no yearly subscriptions exist)

After adding a yearly subscription:
Yearly Spending = price of that subscription
```

---

## Next Steps

1. ✅ Go to "All Subscriptions"
2. ✅ Click "Add Subscription"
3. ✅ Select "Yearly" for frequency
4. ✅ Add price (e.g., $99.99)
5. ✅ Click "Save Subscription"
6. ✅ Go to Dashboard
7. ✅ Check "Yearly Spending" - should update! ✨

---

## Real Example

**Your Current Subscriptions:**
```
1. Netflix - $15.99/month - Status: Active
2. Spotify - $4.01/month - Status: Active
```

**Current Stats:**
```
Total Active: 2
Monthly Spending: $20.00
Yearly Spending: $0.00
```

**After Adding Microsoft 365 ($99.99/year):**
```
1. Netflix - $15.99/month - Status: Active
2. Spotify - $4.01/month - Status: Active
3. Microsoft 365 - $99.99/year - Status: Active
```

**New Stats:**
```
Total Active: 3
Monthly Spending: $20.00 (unchanged)
Yearly Spending: $99.99 (NEW!)
```

---

## Status
✅ **Dashboard working correctly** - Yearly Spending is $0.00 because you have no yearly subscriptions yet!

**Solution:** Add a subscription with `Frequency: Yearly` and the stat will update! 🎉
