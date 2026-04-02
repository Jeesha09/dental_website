import { createSupabaseClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      childName,
      dateOfBirth,
      gender,
      cleftType,
      cleftSide,
      location,
      parentId,
    } = body;

    // Get user ID from request body
    if (!parentId) {
      return NextResponse.json(
        { message: 'Unauthorized - Please log in first' },
        { status: 401 }
      );
    }

    // Create client inside function
    const supabase = createSupabaseClient();

    // Verify user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', parentId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { message: 'Invalid user' },
        { status: 401 }
      );
    }

    const user = { id: parentId };

    // Validate input
    if (!childName || !dateOfBirth || !cleftType || !cleftSide) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create child record
    const { data: child, error: childError } = await supabase
      .from('children')
      .insert({
        parent_id: user.id,
        name: childName,
        date_of_birth: dateOfBirth,
        gender: gender || null,
        cleft_type: cleftType,
        cleft_side: cleftSide,
        location: location || null,
        status: 'active',
      })
      .select()
      .single();

    if (childError) {
      return NextResponse.json(
        { message: childError.message },
        { status: 500 }
      );
    }

    // Create registry entry
    const { error: registryError } = await supabase
      .from('registry_entries')
      .insert({
        child_id: child.id,
        cleft_classification: cleftType,
        incidence_region: location || null,
      });

    if (registryError) {
      console.error('Registry creation error:', registryError);
    }

    // Create Smile Garden record for gamification
    const { error: gardenError } = await supabase
      .from('smile_garden')
      .insert({
        child_id: child.id,
      });

    if (gardenError) {
      console.error('Smile Garden creation error:', gardenError);
    }

    // Generate default milestones based on child's age
    const birthDate = new Date(dateOfBirth);
    const ageMonths = Math.floor(
      (new Date().getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    const milestones = [
      {
        milestone_type: 'lip_repair',
        scheduled_age_months: 3,
        purpose: 'Primary lip repair surgery',
        expected_outcomes: 'Improved appearance and feeding',
        preparation_tips: 'Ensure proper nutrition and health before surgery',
      },
      {
        milestone_type: 'palate_repair',
        scheduled_age_months: 12,
        purpose: 'Primary palate repair surgery',
        expected_outcomes: 'Better speech and swallowing',
        preparation_tips: 'Speech therapy may begin after healing',
      },
      {
        milestone_type: 'speech_assessment',
        scheduled_age_months: 60,
        purpose: 'Comprehensive speech evaluation',
        expected_outcomes: 'Identify speech therapy needs',
        preparation_tips: 'Speech therapy may continue for years',
      },
      {
        milestone_type: 'alveolar_bone_graft',
        scheduled_age_months: 96,
        purpose: 'Bone grafting for alveolar ridge',
        expected_outcomes: 'Better dental development',
        preparation_tips: 'Orthodontics may follow',
      },
      {
        milestone_type: 'orthodontics',
        scheduled_age_months: 120,
        purpose: 'Orthodontic evaluation and treatment',
        expected_outcomes: 'Proper tooth alignment',
        preparation_tips: 'Long-term commitment to treatment',
      },
    ];

    for (const milestone of milestones) {
      const scheduledDate = new Date(birthDate);
      scheduledDate.setMonth(scheduledDate.getMonth() + milestone.scheduled_age_months);

      const { error: milestoneError } = await supabase
        .from('milestones')
        .insert({
          child_id: child.id,
          milestone_type: milestone.milestone_type,
          scheduled_age_months: milestone.scheduled_age_months,
          scheduled_date: scheduledDate.toISOString().split('T')[0],
          purpose: milestone.purpose,
          expected_outcomes: milestone.expected_outcomes,
          preparation_tips: milestone.preparation_tips,
          status: ageMonths >= milestone.scheduled_age_months ? 'due' : 'scheduled',
        });

      if (milestoneError) {
        console.error('Milestone creation error:', milestoneError);
      }
    }

    return NextResponse.json(
      {
        message: 'Child registered successfully',
        childId: child.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Child registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
